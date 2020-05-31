import React, {Component} from 'react';
import './RemoveDevice.css';
import './Common.css';


class RemoveDevicePopup extends Component {

    constructor (props) {
        super(props);

        this.close_cb = props.close_cb;
        this.remove_cb = props.data.remove_cb;
        this.png_ref = props.data.png_ref;
        this.device_name = props.data.dev_name;

        this.onremove = () => {
            this.close_cb();
            this.remove_cb();
        }
    }

    render() {
        return (
            <div>
                <div className='popup-remove'>
                    <div className='popup-remove-inner'>
                        <div className="pop-remove-top">
                            <div className='center-pos remove-ico'> 
                                <img src={process.env.PUBLIC_URL + this.png_ref}></img>
                            </div>
                            <div className="dev-name-under-ico">
                                {this.device_name}
                            </div>
                        </div>

                        <div className="popup-remove-text-label center-pos">Do you want to delete Device?</div>
                        <div className="popup-buttons-container center-pos">
                            <button className="remove-button remove-button-cancel" onClick={this.close_cb}>Cancel</button>
                            <button className="remove-button remove-button-remove" onClick={this.onremove}>Remove</button> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RemoveDevicePopup;