import React, {Component} from 'react';
import './DeviceTable.css';
import './DeviceState.css'
import UpdateDevicePopup from '../popups/UpdateDevice'
import RemoveDevicePopup from '../popups/RemoveDevice'
import EditDevicePopup from '../popups/EditDevice'
import SettingsPopup from '../popups/SettingsPopup'
import Switch from '@material-ui/core/Switch';
import UpdateProgressBar from './UpdateProgressBar'

import socket from '../socketio'

const table_columns = [
    'Device', 'Name', 'Location', 'State', 'Battery', 'Tamper', 'Status', ''
]

const devices = [
    // {id:0, mac:"123456", png: "Resources/device_smoke.png", name: 'Smoke Detector', location: 'Kitchen', state: true, battery: 4, tamper: true, status: true, update: true},
    // {id:1, mac:"123456", png: 'Resources/device_leak.png', name: 'Leak Detector', location: 'Kitchen', state: true, battery: 12, tamper: true, status: false, update: false},
    // {id:2, mac:"123456", png: 'Resources/device_motion.png', name: 'Motion Detector', location: 'Kitchen', state: true, battery: 29, tamper: true, status: false, update: false},
    // {id:3, mac:"123456", png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: false, battery: 100, tamper: false, status: false, update: true},
    // {id:4, mac:"123456", png: 'Resources/device_motion.png', name: 'Motion Detector', location: 'Kitchen', state: true, battery: 38, tamper: true, status: false, update: true},
    // {id:5, mac:"123456", png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: true, battery: 2, tamper: true, status: true, update: true},    
    // {id:6, mac:"123456", png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: true, battery: 2, tamper: true, status: true, update: false},    
    // {id:7, mac:"123456", png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: true, battery: 2, tamper: true, status: true, update: true},    
]

function batteryItem(percent) {
    const BATTERY_LEVEL_LOW = 8;
    const BATTERY_LEVEL_MIDDLE = 25;
    const BATTERY_LEVEL_HIGH = 100;

    if (percent <= BATTERY_LEVEL_LOW) {
        return <div class="battery-item"> 
                <img src={process.env.PUBLIC_URL + 'Resources/ico_battery_low.png'}></img>
                <div className="battery-item-text battery-item-low">{percent + '%'}</div>
            </div>
    }
    else if (percent <= BATTERY_LEVEL_MIDDLE) {
        return <div class="battery-item"> 
            <img src={process.env.PUBLIC_URL + 'Resources/ico_battery_middle.png'}></img>
            <div className="battery-item-text battery-item-middle">{percent + '%'}</div>
        </div>
    }
    else if (percent <= BATTERY_LEVEL_HIGH) {
        return <div class="battery-item"> 
            <img src={process.env.PUBLIC_URL + 'Resources/ico_battery_high.png'}></img>
            <div className="battery-item-text battery-item-high">{percent + '%'}</div>
        </div>
    }
}

function tamperItem(value) {
    if (value) {
        return <div>Set</div>
    }
    else {
        return <div className="tamper-item-set">Unset</div>
    }
}

function statusItem(value) {
    if (value) {
        return <div className="status-item-set">Detected</div>
    }
    else {
        return <div>Not detected</div>
    }
}

function settingsItem(device_data, update_func, set_ref, disabled) {
    return <div class={"settings-item " + (disabled ? "settings-item-disabled" : "")}
                onClick={!disabled ? update_func : null} 
                ref={el => set_ref(el)}> 
        <img src={process.env.PUBLIC_URL + 'Resources/ico_settings_' + (device_data.to_update ? 'active' : 'inactive') + '.png'}></img>
    </div>
}

function stateItem(device_data, state_change_cb, disabled) {
    return <div>
            <div className="state-switch-cont">
                <label class="state-switch">
                    <input type="checkbox" checked={device_data} onChange={!disabled ? state_change_cb : null}></input>
                    <span class="slider round"></span>
                </label>
            </div>
            <div className={"state-item-text state-item-text-" + (device_data ? "enabled" : "disabled")}>
                {device_data ? 'On' : 'Off'}
            </div>
        </div>
}

class DeviceTable extends Component {

    constructor (props) {
        super(props);

        this.onpopup = props.onpopup;

        this.isItemUpdating.bind(this);

        this.state = {
            updateInProgress : false,
            dev_info: devices,
            selectedId : -1
        }
        
        this.tablePos = null;
        this.refArr = [];
        this.setRef = (element, id) => {
            this.refArr[id] = element;
        };

        socket.subscribe("dev_read_list_resp", data => {  this.setState({ dev_info : data }); });

        socket.subscribe("dev_upd_ack", () => { socket.notifyBackend("dev_read_list", {}); });

        socket.subscribe("dev_add_ack", () => { socket.notifyBackend("dev_read_list", {}); });

        socket.subscribe("dev_disconn", () => { socket.notifyBackend("dev_read_list", {}); });

        socket.subscribe("dev_notify_data", () => { socket.notifyBackend("dev_read_list", {}); });

        socket.subscribe("update_dev_ack", (data) => { this.updateConfirmCb(data["mac"]); });
    
        // socket.subscribe("dev_conn_resp", () => { socket.notifyBackend("dev_read_list", {}); })

        socket.notifyBackend("dev_read_list", {});


        this.showSettingsPopup = (id) => {
            this.onpopup(SettingsPopup, {
                positionSource : this.refArr[id],
                update_cb : this.state.dev_info.find(el => el.id == id).to_update ? this.updateReqCb : null,
                remove_cb : this.removeReqCb,
                edit_cb : this.editReqCb
            });

            this.setState({
                devId : id,
            })
        };

        this.showUpdatePopup = (id) => {
            this.onpopup(UpdateDevicePopup, {
                update_cb : this.updateConfirmCb,
                dev_data : this.state.dev_info.find(el => el.id == this.state.devId)
            });

            this.setState({
                devId : id,
            })
        };

        this.showRemovePopup = (id) => {
            this.onpopup(RemoveDevicePopup, {
                dev_data : this.state.dev_info.find(el => el.id == this.state.devId)
            });

            this.setState({
                devId : id,
            })
        };

        this.showEditPopup = (id) => {
            this.onpopup(EditDevicePopup, {
                edit_cb : this.editCb,
                dev_data : this.state.dev_info.find(el => el.id == this.state.devId)
            });

            this.setState({
                devId : id,
            })
        };

        this.closeSettingsPopup = (i) => {
            this.setState({
                devId : -1
            })
        };
        this.closeUpdatePopup = (i) => {
            this.setState({
                devId : -1
            })
        };
        this.closeRemovePopup = (i) => {
            this.setState({
                devId : -1
            })
        };

        this.updateReqCb = (i) => {
            console.log("update requested, use saved devId", this.state.devId);
            let devId_update = this.state.devId;
            this.showUpdatePopup(i);
            this.setState({
                devId : devId_update
            })
        };
        this.removeReqCb = (i) => {
            console.log("remove requested, use saved devId", this.state.devId);
            let devId_remove = this.state.devId;
            this.showRemovePopup(i);
            this.setState({
                devId : devId_remove
            })
        };
        this.editReqCb = (i) => {
            console.log("edit requested, use saved devId", this.state.devId);
            let devId_edit = this.state.devId;
            this.showEditPopup(i);
            this.setState({
                devId : devId_edit
            })
        };
        this.updateConfirmCb = (mac) => {
            console.log("update started, use requested mac", mac);

            let dev_data = this.state.dev_info.find(el => el.mac == mac);

            this.setState({
                updateInProgress : true,
                devId : dev_data.id,
                positionSource : this.refArr[dev_data.id]
            })
        };
        this.removeConfirmCb = (i) => {
            console.log("removing device, use requested devId", this.state.devId);
            let devId_remove = this.state.devId;
            this.closeRemovePopup(null);

            this.setState({
                dev_info: this.state.dev_info.filter(device_data => (device_data.id != devId_remove)),
                devId : -1
            });
            console.log("new dev-info", this.state.dev_info);
        }

        this.updateCompleteCb = (i) => {
            console.log("Update finished");
            this.setState({
                updateInProgress : false,
                devId : -1
            })
        }
        this.removeCompleteCb = (i) => {
            console.log("Remove finished");
            this.setState({
                devId : -1
            })
        }
        this.editCb = (i) => {
            console.log("Edit finished");
            this.setState({
                devId : -1
            })
        }
        
        this.state_changed = (i) => {
            var obj = this.state.dev_info.find(el => el.id === i);
            const mac = obj.mac;

            socket.notifyBackend("dev_upd", obj);

            this.setState(this.state.dev_info.map(device_data => {
                if (device_data.id === i) {
                    device_data.state = !device_data.state;
                }
                return device_data;
            }));
        }
    }

    isItemActive(id) {
        let update_in_progress = this.isItemUpdating(id);
        return this.state.dev_info.find(el => el.id == id).active && !update_in_progress;
    }

    isItemUpdating(id) {
        return this.state.updateInProgress && this.state.devId == id
    }

    render() {
        return (
            <div className="tableFixHead">
            <table id="dev-table" ref={el => {this.tablePos = el; }}>
                <tr className="table-header">
                    {table_columns.map( column_name => (
                        <th className="dev-table-header dev-table-item">{column_name}</th>
                    ))}
                </tr>

                {this.state.dev_info.map(device_data => (
                    <tr class={"dev-table-row"} >
                        

                        {this.isItemUpdating(device_data.id) ? (
                            <td>
                                <UpdateProgressBar
                                    x={this.tablePos.getBoundingClientRect().x}
                                    y={this.state.positionSource.getBoundingClientRect().y}
                                    oncomplete={this.updateCompleteCb}
                                />     
                            </td> 
                            ) : (
                            <td class={"dev-table-item dev-tab-item-text " + (this.isItemActive(device_data.id) ? "" : "diaphanous")}>
                                <img src={process.env.PUBLIC_URL + "Resources/device_" + device_data.type +".png"}></img>
                            </td>
                        )}



                        <td class={"dev-table-item dev-tab-item-text " + (this.isItemActive(device_data.id) ? "" : "diaphanous")}>
                            {device_data.name}
                        </td>

                        <td class={"dev-table-item dev-tab-item-text " + (this.isItemActive(device_data.id) ? "" : "diaphanous")}>
                            {device_data.location}
                        </td>

                        <td class={"dev-table-item " + (this.isItemActive(device_data.id) ? "" : "diaphanous")}>
                            {stateItem(
                                device_data.state, 
                                (x) => this.state_changed(device_data.id),
                                this.state.updateInProgress && this.state.devId == device_data.id
                            )}
                        </td>

                        <td class={"dev-table-item " + (this.isItemActive(device_data.id) ? "" : "diaphanous")}>
                            {batteryItem(device_data.battery)}
                        </td>

                        <td class={"dev-table-item dev-tab-item-text " + (this.isItemActive(device_data.id) ? "" : "diaphanous")}>
                            {tamperItem(device_data.tamper)}
                        </td>

                        <td class={"dev-table-item dev-tab-item-text " + (this.isItemActive(device_data.id) ? "" : "diaphanous")}>
                            {statusItem(device_data.status)}
                        </td>

                        <td class={"dev-tab-item-text " + (this.isItemActive(device_data.id) ? "" : "diaphanous")}>
                            {settingsItem(device_data, 
                                        () => this.showSettingsPopup(device_data.id),
                                        el => this.setRef(el, device_data.id),
                                        this.state.updateInProgress)}
                        </td>
                    </tr>
                ))}
            </table>
            </div>
        )
    }
}

export default DeviceTable;