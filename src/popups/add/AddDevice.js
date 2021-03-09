import React, {Component} from 'react';
import { DeviceCard } from './AddDeviceCard'
import { DeviceCardList } from './AddDeviceCardList'
import { DeviceSetup } from './AddDeviceSetup'
import './AddDevice.css';
import '../Common.css';
import '../TextInputComponent.css';
import '../SelectComponent.css';
import socket from '../../socketio'

const scan_info = [
    {id: 0, type: "smoke", name: 'Smoke Detector', png: 'Resources/device_smoke.png', mac: 'AC0012351282'},
    {id: 1, type: "leak", name: 'Leak Detector', png: 'Resources/device_leak.png', mac: 'F00017351282'},
    {id: 2, type: "gas", name: 'Gas Detector', png: 'Resources/device_gas.png', mac: '7F0012331282'},
    {id: 3, type: "gas", name: 'Gas Detector', png: 'Resources/device_gas.png', mac: '0C0012351282'},
]

const locations = [
    '-- No room --', 'Kitchen', 'Hall'
]

export default class AddDevicePopup extends Component {

    constructor (props) {
        super(props);

        socket.subscribe("dev_add_ack", data => { socket.notifyBackend("dev_read_list", {}); })

        this.close_cb = props.close_cb;
        this.add_cb = props.data.add_cb;

        this.state = {
            selected_id : 0,
            scanned : false
        }

        this.select_cb = (id) => {
            this.setState({
                selected_id : id
            })
        }

        this.confirm_device_cb = (dev_data) => {
            this.setState({
                device_confirmed : true,
            });
        }

        this.set_info_cb = (dev_info) => {
            this.setState({
                input_info : dev_info
            });
        }

        this.add_device_cb = () => {
            socket.notifyBackend("dev_add", this.state.input_info);
            // Send here add device request to BACK [this.state.dev_info]
            this.add_cb();
            this.close_cb();
        }

        this.debug_fake_scan_complete = () => {
            clearInterval(this.interval);
            this.setState({
                scanned : true
            })
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.debug_fake_scan_complete(), 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let button_disabled = "";
        if (this.state.device_confirmed) {
            if (!this.state.hasOwnProperty('input_info') || !this.state.input_info.name) {
                button_disabled="disabled";
            }
        }
        else {
            if (scan_info.length == 0) {
                button_disabled="disabled"
            }
        }

        let button_text = (this.state.device_confirmed ? "Add device" : "Continue");

        let main_content = null;
        if (this.state.scanned) { /* specifiyng scanned device data */
            if (this.state.device_confirmed) {
                main_content = 
                    <DeviceSetup 
                        dev_data={scan_info.find(item => item.id == this.state.selected_id)}
                        set_info_scb={info => this.set_info_cb(info)}
                        locations={locations}
                    />
            }
            else { /* selecting scanned device: */
                main_content = 
                    <DeviceCardList
                        select_cb={this.select_cb}
                        scanned_devices={scan_info}
                    />
            }
        }
        else { /* scan in progress, show wait bar */
            main_content = <div>
                <div className="widthy center-pos">
                    <img src={process.env.PUBLIC_URL + 'Resources/ico_wait_big.gif'}/>
                </div>
                <div className="widthy label select-col center-pos">Scanning for devices</div>
            </div>
        }

        return (
            <div>
                <div className='popup darken'>
                    <div className='popup-add-inner'>
                        <div id="popup-add-dev-header">
                            <div className="popup-add-text-label center-pos">Add new device</div>
                            <div className="top-right">
                                <img src={process.env.PUBLIC_URL + 'Resources/button_popup_close.png'} onClick={this.close_cb}></img>
                            </div>
                        </div>

                        {main_content}

                        {this.state.scanned ?
                        <div className="popup-buttons-container center-pos">
                            <button className="button cancel" onClick={this.close_cb}>Cancel</button>
                            <button 
                                className={"button active"}
                                onClick={this.state.device_confirmed ? this.add_device_cb : this.confirm_device_cb} 
                                disabled={button_disabled}>
                                    {button_text}
                            </button> 
                        </div>
                        : null}
                    </div>
                </div>

            </div>
        )
    }
}
