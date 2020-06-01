import React, {Component} from 'react';
import './DeviceTableHeader.css';
import AddDevicePopup from '../popups/add/AddDevice'
import UpdateDevicePopup from '../popups/UpdateDevice'


class DeviceTableHeader extends Component {

    constructor (props) {
        super(props);
        this.onpopup = props.onpopup;

        this.popupAddDevice = () => {
            this.onpopup(AddDevicePopup, {
                add_cb : this.addDeviceCallback
            })
        }

        this.addDeviceCallback = (data) => {
            console.log("data:", data);
        }
    }

    render() {
        return (
            <div id="device-table-header">
                <div id="add-device-btn">
                    <img src={process.env.PUBLIC_URL + 'Resources/button_add_device.png'} onClick={this.popupAddDevice}></img>
                </div>

                <div id="device-table-label">
                    Devices
                </div>
            </div>
        )
    }
}

export default DeviceTableHeader;