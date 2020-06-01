import React, {Component} from 'react';
import './UpdateDevice.css';
import './Common.css';


class UpdateDevicePopup extends Component {

    constructor (props) {
        super(props);

        this.close_cb = props.close_cb;
        this.update_cb = props.data.update_cb

        this.onupdate = () => {
            this.close_cb();
            this.update_cb();
        }
    }

    render() {
        return (
            <div>
                <div className='popup darken'>
                    <div className='popup-update-inner'>
                        <div className="top-right">
                                <img src={process.env.PUBLIC_URL + 'Resources/button_popup_close.png'} onClick={this.close_cb}></img>
                        </div>
                        <div className='center-pos update-ico'> 
                            <img src={process.env.PUBLIC_URL + "Resources/ico_device_update.png"}></img>
                        </div>
                        <div className="popup-text-label center-pos">Do you want to update Device?</div>
                        <div className="popup-buttons-container center-pos">
                            <button className="button cancel" onClick={this.close_cb}>Cancel</button>
                            <button className="button" onClick={this.onupdate}>Update</button> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateDevicePopup;