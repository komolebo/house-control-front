import React, {Component} from 'react';
import './DeviceTable.css';
import './DeviceState.css'

// import Java from '../Resources/device_smoke.png';

const table_columns = [
    'Device', 'Name', 'Location', 'State', 'Battery', 'Tamper', 'Status', ''
]

const devices = [
    {png: "Resources/device_smoke.png", name: 'Smoke Detector', location: 'Kitchen', state: true, battery: 4, tamper: true, status: true, update: false},
    {png: 'Resources/device_leak.png', name: 'Leak Detector', location: 'Kitchen', state: true, battery: 12, tamper: true, status: false},
    {png: 'Resources/device_motion.png', name: 'Motion Detector', location: 'Kitchen', state: true, battery: 29, tamper: true, status: false, update: true},
    {png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: false, battery: 100, tamper: false, status: false},
    {png: 'Resources/device_motion.png', name: 'Motion Detector', location: 'Kitchen', state: true, battery: 38, tamper: true, status: false},
    {png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: true, battery: 2, tamper: true, status: true},    
]

function batteryItem(percent) {
    const BATTERY_LEVEL_LOW = 8;
    const BATTERY_LEVEL_MIDDLE = 25;
    const BATTERY_LEVEL_HIGH = 100;

    if (percent <= BATTERY_LEVEL_LOW) {
        return <div class="battery-item"> 
                <img src={process.env.PUBLIC_URL + 'Resources/ico_battery_low.png'}></img>
                <div className="battery-item-text battery-item-low">{percent + '%'}</div>
            </div>
    }
    else if (percent <= BATTERY_LEVEL_MIDDLE) {
        return <div class="battery-item"> 
            <img src={process.env.PUBLIC_URL + 'Resources/ico_battery_middle.png'}></img>
            <div className="battery-item-text battery-item-middle">{percent + '%'}</div>
        </div>
    }
    else if (percent <= BATTERY_LEVEL_HIGH) {
        return <div class="battery-item"> 
            <img src={process.env.PUBLIC_URL + 'Resources/ico_battery_high.png'}></img>
            <div className="battery-item-text battery-item-high">{percent + '%'}</div>
        </div>
    }
}

function tamperItem(value) {
    if (value) {
        return <div>Set</div>
    }
    else {
        return <div className="tamper-item-set">Unset</div>
    }
}

function statusItem(value) {
    if (value) {
        return <div className="status-item-set">Detected</div>
    }
    else {
        return <div>Not detected</div>
    }
}

function settingsItem(device_data) {
    if (device_data.update) {
        return <div class="settings-item"> 
            <img src={process.env.PUBLIC_URL + 'Resources/ico_settings_active.png'}></img>
        </div>
    }
    else {
        return <div class="settings-item"> 
            <img src={process.env.PUBLIC_URL + 'Resources/ico_settings_inactive.png'}></img>
        </div>
    }
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
            <table id="dev-table">
                <tr className="table-header">
                    {table_columns.map( column_name => (
                        <th className="dev-table-header dev-table-item">{column_name}</th>
                    ))}
                </tr>
                
                {devices.map(device_data => (
                    <tr class="dev-table-row">
                        <td class="dev-table-item dev-tab-item-text">
                            <img src={process.env.PUBLIC_URL + device_data.png}></img>
                            
                        </td>
                        <td class="dev-table-item dev-tab-item-text">
                            {device_data.name}
                        </td>

                        <td class="dev-table-item dev-tab-item-text">
                            {device_data.location}
                        </td>

                        <td class="dev-table-item">
                            <label class="switch">
                                <input type="checkbox"></input>
                                <span class="slider round"></span>
                            </label>
                        </td>

                        <td class="dev-table-item">
                            {batteryItem(device_data.battery)}
                        </td>

                        <td class="dev-table-item dev-tab-item-text">
                            {tamperItem(device_data.tamper)}
                        </td>

                        <td class="dev-table-item dev-tab-item-text">
                            {statusItem(device_data.status)}
                        </td>

                        <td class="dev-table-item dev-tab-item-text">
                            {settingsItem(device_data)}
                        </td>

                    </tr>
                ))}
            </table>
        )
    }
}

export default DeviceTable;