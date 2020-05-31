import React, {Component} from 'react';
import './RemoveDevice.css';


class RemoveDevicePopup extends Component {

    constructor (props) {
        super(props);

        this.onclose = props.onclose;
        this.onremove = props.onremove;
        this.png_ref = props.png_ref;
    }

    render() {
        return (
            <div>
                <div className='popup-remove'>
                    <div className='popup-remove-inner'>
                        <div className='center-pos remove-ico'> 
                            <img src={process.env.PUBLIC_URL + this.png_ref}></img>
                        </div>
                        <div className="popup-text-label center-pos">Do you want to delete Device?</div>
                        <div className="remove-buttons-container center-pos">
                            <button className="remove-button remove-button-cancel" onClick={this.onclose}>Cancel</button>
                            <button className="remove-button remove-button-remove" onClick={this.onremove}>Remove</button> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RemoveDevicePopup;