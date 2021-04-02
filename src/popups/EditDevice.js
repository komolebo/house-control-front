import React, {Component} from 'react';
import { DeviceSetup } from './SetupDevice'
import './EditDevice.css';
import './Common.css';
import socket from '../socketio';

export default class EditDevicePopup extends Component {

    constructor (props) {
        super(props);

        this.close_cb = props.close_cb;
        this.device_data = props.data.dev_data;
        this.state = {};
        
        this.oneditclick = () => {
            socket.notifyBackend("dev_upd", this.state.input_info);
            this.close_cb();
        }

        this.set_info_cb = (dev_info) => {
            this.setState({
                input_info : dev_info
            });
        }
    }

    render() {
        let button_disabled = "";
        if (!this.state.hasOwnProperty('input_info') || !this.state.input_info.name) {
            button_disabled="disabled";
        }

        return (
            <div>
                <div className='popup darken'>
                    <div className='popup-add-inner'>
                        <div id="popup-add-dev-header">
                            <div className="popup-add-text-label center-pos">Edit device</div>
                            <div className="top-right">
                                <img src={process.env.PUBLIC_URL + 'Resources/button_popup_close.png'} onClick={this.close_cb}></img>
                            </div>
                        </div>

                        <DeviceSetup 
                            dev_data={this.device_data}
                            set_info_scb={info => this.set_info_cb(info)}
                        />

                        <div className="popup-buttons-container center-pos">
                            <button className="button cancel" onClick={this.close_cb}>Cancel</button>
                            <button 
                                className={"button active"}
                                onClick={this.oneditclick}
                                disabled={button_disabled}>
                                    Edit device
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
