import React, {Component} from 'react';
import './DeviceTable.css';
import './DeviceState.css'

// import Java from '../Resources/device_smoke.png';

const table_columns = [
    'Device', 'Name', 'Location', 'State', 'Battery', 'Tamper', 'Status', ''
]

const devices = [
    {png: "Resources/device_smoke.png", name: 'Smoke Detector', location: 'Kitchen', state: false, battery: 4, tamper: true, status: true},
    {png: 'Resources/device_leak.png', name: 'Leak Detector', location: 'Kitchen', state: false, battery: 12, tamper: true, status: true},
    {png: 'Resources/device_motion.png', name: 'Motion Detector', location: 'Kitchen', state: false, battery: 29, tamper: true, status: true},
    {png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: false, battery: 100, tamper: true, status: true},
]

function batteryItem(percent) {
    if (percent < 8) {
        return <img src=""></img>
    }
    return
}

class DeviceTable extends Component {

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(rowId) {
    }

    render() {
        return (
            <div id="device-table">
                <table>
                    <tr className="table-header">
                        {table_columns.map( column_name => (
                            <th className="dev-table-header">{column_name}</th>
                        ))}
                    </tr>
                    
                    {devices.map(device_data => (
                        <tr class="dev-table-row">
                            <td class="dev-table-item dev-tab-item-text">
                                <img src={process.env.PUBLIC_URL + device_data.png}></img>
                                
                            </td>
                            <td class="dev-table-item dev-tab-item-text">
                                Name
                            </td>
                            <td class="dev-table-item dev-tab-item-text">
                                Location
                            </td>
                            <td class="dev-table-item">
                                <label class="switch">
                                    <input type="checkbox"></input>
                                    <span class="slider round"></span>
                                </label>
                            </td>
                            <td class="dev-table-item">
                                Battery
                                {batteryItem(device_data.battery)}
                            </td>
                            <td class="dev-table-item dev-tab-item-text">
                                Tamper
                            </td>
                            <td class="dev-table-item dev-tab-item-text">
                                Status
                            </td>


                        </tr>
                    ))}

                </table>
            </div>
        )
    }
}

export default DeviceTable;