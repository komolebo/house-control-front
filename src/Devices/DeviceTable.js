import React, {Component} from 'react';
import './DeviceTable.css';
import './DeviceState.css'
import UpdateDevicePopup from '../popups/UpdateDevice'
import RemoveDevicePopup from '../popups/RemoveDevice'
import EditDevicePopup from '../popups/EditDevice'
import SettingsPopup from '../popups/SettingsPopup'
import Switch from '@material-ui/core/Switch';
import UpdateProgressBar from './UpdateProgressBar'

const table_columns = [
    'Device', 'Name', 'Location', 'State', 'Battery', 'Tamper', 'Status', ''
]

const devices = [
    {id:0, mac:"123456", png: "Resources/device_smoke.png", name: 'Smoke Detector', location: 'Kitchen', state: true, battery: 4, tamper: true, status: true, update: true},
    {id:1, mac:"123456", png: 'Resources/device_leak.png', name: 'Leak Detector', location: 'Kitchen', state: true, battery: 12, tamper: true, status: false, update: false},
    {id:2, mac:"123456", png: 'Resources/device_motion.png', name: 'Motion Detector', location: 'Kitchen', state: true, battery: 29, tamper: true, status: false, update: false},
    {id:3, mac:"123456", png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: false, battery: 100, tamper: false, status: false, update: true},
    {id:4, mac:"123456", png: 'Resources/device_motion.png', name: 'Motion Detector', location: 'Kitchen', state: true, battery: 38, tamper: true, status: false, update: true},
    {id:5, mac:"123456", png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: true, battery: 2, tamper: true, status: true, update: true},    
    {id:6, mac:"123456", png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: true, battery: 2, tamper: true, status: true, update: false},    
    {id:7, mac:"123456", png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: true, battery: 2, tamper: true, status: true, update: true},    
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
        <img src={process.env.PUBLIC_URL + 'Resources/ico_settings_' + (device_data.update ? 'active' : 'inactive') + '.png'}></img>
    </div>
}

function stateItem(device_data, state_change_cb, disabled) {
    // return <div>
    //     <Switch
    //         checked={device_data}
    //         onChange={(state) => {console.log("checked");}}
    //         color="primary"
    //         name="checkedB"
    //         inputProps={{ 'aria-label': 'primary checkbox' }}
    //   />
    // </div>
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

        this.showSettingsPopup = (id) => {
            this.onpopup(SettingsPopup, {
                positionSource : this.refArr[id],
                update_cb : this.state.dev_info.find(el => el.id == id).update ? this.updateReqCb : null,
                remove_cb : this.removeReqCb,
                edit_cb : this.editReqCb
            });

            this.setState({
                devId : id,
                positionSource : this.refArr[id]
            })
        };

        this.showUpdatePopup = (id) => {
            this.onpopup(UpdateDevicePopup, {
                update_cb : this.updateConfirmCb,
            });

            this.setState({
                devId : id,
            })
        };

        this.showRemovePopup = (id) => {
            this.onpopup(RemoveDevicePopup, {
                remove_cb : this.removeConfirmCb,
                png_ref : this.state.dev_info.find(el => el.id == this.state.devId).png,
                dev_name : this.state.dev_info.find(el => el.id == this.state.devId).name
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
        this.updateConfirmCb = (i) => {
            console.log("update started, use requested devId", this.state.devId);
            let devId_update = this.state.devId;
            this.setState({
                updateInProgress : true,
                devId : devId_update
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
            console.log("state changed", i);
            console.log(this.state.dev_info);

            this.setState(this.state.dev_info.map(device_data => {
                if (device_data.id === i) {
                    device_data.state = !device_data.state;
                }
                return device_data;
            }));
        }
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
                    <tr class={"dev-table-row " + ((this.state.updateInProgress && this.state.devId == device_data.id) ? "dev-table-row-updating" : "")} >
                        <td class="dev-table-item dev-tab-item-text">
                            <img src={process.env.PUBLIC_URL + device_data.png}></img>
                            
                        </td>
                        <td class="dev-table-item dev-tab-item-text">
                            {device_data.name}
                        </td>

                        <td class="dev-table-item dev-tab-item-text">
                            {device_data.location}
                        </td>

                        <td class="dev-table-item">
                            {stateItem(
                                device_data.state, 
                                (x) => this.state_changed(device_data.id),
                                this.state.updateInProgress && this.state.devId == device_data.id
                            )}
                        </td>

                        <td class="dev-table-item">
                            {batteryItem(device_data.battery)}
                        </td>

                        <td class="dev-table-item dev-tab-item-text">
                            {tamperItem(device_data.tamper)}
                        </td>

                        <td class="dev-table-item dev-tab-item-text">
                            {statusItem(device_data.status)}
                        </td>

                        <td class="dev-tab-item-text">
                            {settingsItem(device_data, 
                                        e => this.showSettingsPopup(device_data.id),
                                        el => this.setRef(el, device_data.id),
                                        this.state.updateInProgress)}
                        </td>
                    </tr>
                ))}
            </table>
            <div>
                {this.state.updateInProgress ?
                <UpdateProgressBar
                    x={this.tablePos.getBoundingClientRect().x}
                    y={this.state.positionSource.getBoundingClientRect().y}
                    oncomplete={this.updateCompleteCb}
                /> : null}
            </div>

            </div>
        )
    }
}

export default DeviceTable;