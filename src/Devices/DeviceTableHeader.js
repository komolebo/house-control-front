import React, {Component} from 'react';
import './DeviceTableHeader.css';


class DeviceTableHeader extends Component {

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(rowId) {
    }

    render() {
        return (
            <div id="device-table-header">
                <div id="add-device-btn">
                    <img src={process.env.PUBLIC_URL + 'button_add_device.png'}></img>
                </div>

                <div id="device-table-label">
                    Devices
                </div>


            </div>
        )
    }
}

export default DeviceTableHeader;