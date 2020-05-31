import React, {Component} from 'react';
import './DeviceTableHeader.css';
import AddDevicePopup from '../popups/AddDevice'


class DeviceTableHeader extends Component {

    constructor (props) {
        super(props);

        this.state = {
            showAddDevPopup : false
        };

        this.addDeviceCallback = this.addDeviceCallback.bind(this);
        this.popupAddDevice = this.popupAddDevice.bind(this);
    }

    popupAddDevice(rowId) {
        console.log("popup");
        this.setState({
            showAddDevPopup : true
        });
    }

    addDeviceCallback() {
        this.setState({
            showAddDevPopup : false
        });
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
                
                <div>
                    {this.state.showAddDevPopup ? <AddDevicePopup closePopup={this.addDeviceCallback}/> : null}
                </div>
            </div>
        )
    }
}

export default DeviceTableHeader;