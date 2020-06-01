import React, {Component} from 'react';
import { DeviceCard } from './AddDeviceCard'
import './AddDeviceCardList.css'


function showNoDeviceFound() {
    return <div className="scan-dev-nothing-found center-pos">
        No device found
    </div>
}

function showScannedDevice(device_data) {
    return <div className="scan-dev-single center-pos"> {
        DeviceCard(
            null,
            device_data, 
            true, 
            false
        )
    }
    </div>
}

function showScannedList(curr_focus, curr_selected, scanned_devices, onselect) {
    return  <div id="scan-dev-list">
        {scanned_devices.map(device_data => (
            // dispaly only if it's focused, 2 items to display at the same time
            (curr_focus == device_data.id || curr_focus + 1 == device_data.id ?
                DeviceCard(
                    onselect, 
                    device_data, 
                    curr_selected == device_data.id, 
                    true
                )
                : null
            )))}
    </div>
}

export class DeviceCardList extends Component {
    constructor(props) {
        super(props);

        this.select_cb = props.select_cb;
        this.scanned_devices = props.scanned_devices;

        this.state = {
            selected : 0,
            focus_start : 0
        }

        this.onselect = (id) => {
            this.select_cb(id);
            this.setState({
                selected : id
            })
        }
        this.scroll_left = () => {
            this.setState({
                focus_start : this.state.focus_start - 1
            })
        }
        this.scroll_right = () => {
            this.setState({
                focus_start : this.state.focus_start + 1
            })
        }
    }

    render() {
        return <div id="scan-dev-info-section"> 
                {this.state.focus_start > 0 ?
                    <div class="scan-dev-paginator scan-dev-paginator-left center-pos" onClick={this.scroll_left}>
                        <img src={process.env.PUBLIC_URL + 'Resources/paginator_left.png'}/>
                    </div>
                : null }

                {this.scanned_devices.length >= 2 ?
                    showScannedList(
                        this.state.focus_start, 
                        this.state.selected, 
                        this.scanned_devices, 
                        this.onselect
                        ) : (
                        this.scanned_devices.length == 1 ?
                            showScannedDevice(this.scanned_devices[0]) :
                            showNoDeviceFound()
                    ) 
                }

                {this.state.focus_start + 2 < this.scanned_devices.length ? 
                    <div class="scan-dev-paginator scan-dev-paginator-right center-pos" onClick={this.scroll_right}>
                        <img src={process.env.PUBLIC_URL + 'Resources/paginator_right.png'}/>
                    </div>
                : null}
        </div>
    };
}
