import React, {Component} from 'react';
import './UpdateDevice.css';


class UpdateDevicePopup extends Component {

    constructor (props) {
        super(props);

        this.onclose = props.onclose;
        this.onupdate = props.onupdate
    }

    render() {
        return (
            <div>
                <div className='popup-update'>
                    <div className='popup-update-inner'>
                        <div className='center-pos update-ico'> 
                            <img src={process.env.PUBLIC_URL + "Resources/ico_device_update.png"}></img>
                        </div>
                        <div className="popup-text-label center-pos">Do you want to update Device?</div>
                        <div className="update-buttons-container center-pos">
                            <button className="update-button update-button-cancel" onClick={this.onclose}>Cancel</button>
                            <button className="update-button update-button-update" onClick={this.onupdate}>Update</button> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateDevicePopup;