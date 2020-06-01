import React, {Component} from 'react';
import { DeviceSetup } from './add/AddDeviceSetup'
import './EditDevice.css';
import './Common.css';


const locations = [
    '-- No room --', 'Kitchen', 'Hall'
]

export default class EditDevicePopup extends Component {

    constructor (props) {
        super(props);

        this.close_cb = props.close_cb;
        this.edit_cb = props.data.edit_cb;
        this.device_data = props.data.dev_data;

        console.log("edit data:", this.device_data);

        this.state = {
            selected_id : 0,
        }

        this.select_cb = (id) => {
            this.setState({
                selected_id : id
            })
        }

        this.set_info_cb = (dev_info) => {
            this.setState({
                input_info : dev_info
            });
        }

        this.edit_device_cb = () => {
            // Send here edit device request to BACK [this.state.input_info]
            console.log(this.state.input_info);
            this.close_cb();
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
                            locations={locations}
                        />

                        <div className="popup-buttons-container center-pos">
                            <button className="button cancel" onClick={this.close_cb}>Cancel</button>
                            <button 
                                className={"button active"}
                                onClick={this.edit_device_cb}
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
