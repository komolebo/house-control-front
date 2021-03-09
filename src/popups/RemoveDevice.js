import React, {Component} from 'react';
import './RemoveDevice.css';
import './Common.css';
import socket from '../socketio'


class RemoveDevicePopup extends Component {

    constructor (props) {
        super(props);

        this.close_cb = props.close_cb;
        // this.remove_cb = props.data.remove_cb;
        this.png_ref = props.data.png_ref;
        this.dev_data = props.data.dev_data;

        socket.subscribe("dev_rem_ack", data => { socket.notifyBackend("dev_read_list", {}); });
        
        this.onremove = () => {
            socket.notifyBackend("dev_rem", {"mac": this.dev_data.mac});

            this.close_cb();
            // this.remove_cb();
        }
    }

    render() {
        return (
            <div>
                <div className='popup darken'>
                    <div className='popup-remove-inner'>
                        <div className="top-right">
                                <img src={process.env.PUBLIC_URL + 'Resources/button_popup_close.png'} onClick={this.close_cb}></img>
                        </div>
                        <div className="pop-remove-top">
                            <div className='center-pos remove-ico'> 
                                <img src={process.env.PUBLIC_URL + this.png_ref}></img>
                            </div>
                            <div className="dev-name-under-ico">
                                {this.device_name}
                            </div>
                        </div>

                        <div className="label white center-pos">Do you want to delete {this.dev_data.name} ?</div>
                        <div className="popup-buttons-container center-pos">
                            <button className="button cancel" onClick={this.close_cb}>Cancel</button>
                            <button className="button active" onClick={this.onremove}>Remove</button> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RemoveDevicePopup;