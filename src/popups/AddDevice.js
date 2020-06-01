import React, {Component} from 'react';
import './AddDevice.css';
import './Common.css';
import './TextInputComponent.css';
import './SelectComponent.css';
// import SelectCheckbox from '../components/SelectCheckbox'

const scanned_devices = [
    {id: 0, name: 'Smoke Detector', png: 'Resources/device_smoke', mac: 'AC0012351282'},
    {id: 1, name: 'Leak Detector', png: 'Resources/device_leak', mac: 'F00017351282'},
    {id: 2, name: 'Gas Detector', png: 'Resources/device_gas', mac: '7F0012331282'},
    {id: 3, name: 'Gas Detector', png: 'Resources/device_gas', mac: '0C0012351282'},
]

const locations = [
    '-- No room --', 'Kitchen', 'Hall'
]

function DeviceCard(click_cb, dev_data, checked, checkable) {
    return <div className={"scan-dev-card " + (checked ? "border-active" : "border-inactive")} onClick={() => click_cb ? click_cb(dev_data.id) : null}>
        {checkable ? 
            <div id="scan-checkbox-container">
                <img src={process.env.PUBLIC_URL + "Resources/checkbox_select_{state}.png".replace('{state}', checked ? "active" : "inactive")}/>
            </div>
        : null}

        <div className="scanned-dev-card-ico center-pos">
            <img src={process.env.PUBLIC_URL + dev_data.png + (checked ? "_active.png" : ".png")}/>
        </div>
        <div className={"dev-name-under-ico " + (checked ? "selected-col" : "")}>
            {dev_data.name}
        </div>
    </div>
}

function showNoDeviceFound() {
    return <div className="scan-dev-nothing-found center-pos">
        No device found
    </div>
}

function showScannedDevice() {
    return <div className="scan-dev-single center-pos"> {
        DeviceCard(
            null,
            scanned_devices[0], 
            true, 
            false
        )
    }
    </div>
}

function showScannedList(curr_focus, curr_selected, device_data, onselect) {
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

function oneDeviceFound(device_data) {
    return <div>

    </div>
}

function twoDevicesFound(dev_arr_data) {
    
}

function manyDevicesFound(dev_arr_data) {
    
}

class DeviceCardList extends Component {
    constructor(props) {
        super(props);

        this.select_cb = props.select_cb;

        this.state = {
            selected : 0,
            focus_start : 0
        }

        this.onselect = (id) => {
            console.log("selected ", id);
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

                {scanned_devices.length >= 2 ?
                    showScannedList(
                        this.state.focus_start, 
                        this.state.selected, 
                        scanned_devices, 
                        this.onselect
                        ) : (
                        scanned_devices.length == 1 ?
                            showScannedDevice() :
                            showNoDeviceFound()
                    ) 
                }

                {this.state.focus_start + 2 < scanned_devices.length ? 
                    <div class="scan-dev-paginator scan-dev-paginator-right center-pos" onClick={this.scroll_right}>
                        <img src={process.env.PUBLIC_URL + 'Resources/paginator_right.png'}/>
                    </div>
                : null}
        </div>
    };
}


class DeviceSetup extends Component {
    constructor(props) {
        super(props);

        this.pass_data_to_ext = props.set_info_scb;
        this.dev_data = props.dev_data;

        this.data = {
            location : null,
            name : null
        }

        this.onselect = event => {
            this.data.location = event.target.value;
            
            if (this.pass_data_to_ext) { this.pass_data_to_ext(this.data) }
        }
        
        this.oninput = event => {
            this.data.name = event.target.value;

            if (this.pass_data_to_ext) { this.pass_data_to_ext(this.data) }
        }
    }

    render() {
        return <div id="add-dev-setup-info-section"> 
            <div className="left-pos"> {
                DeviceCard(
                    null,
                    this.dev_data, 
                    false, 
                    false
                )}
            </div>
            <div id="add-dev-setup-section" className="left-pos">
                <div className="text-label-simple add-dev-setup-item text-color-grey">Address</div>
                <div className="add-dev-setup-item">
                    <input type="input" class="form__field" placeholder={this.dev_data.mac} name="name" id='name' disabled />
                </div>

                <div className="text-label-simple add-dev-setup-item">Device Location</div>
                <div className="add-dev-setup-item">
                    <select className="select-styled select" onChange={this.onselect}>
                        {locations.map(location => (
                            <option className="select1 select-styled select-options" value={location}>{location}</option>
                        ))}
                    </select> 

                </div>

                <div className="text-label-simple add-dev-setup-item">Device name</div>
                <div className="add-dev-setup-item">
                    <input type="input" class="form__field" placeholder="Device name" name="name" id='name' onChange={this.oninput} required />
                </div>
            </div>
        </div>
    }
}


class AddDevicePopup extends Component {

    constructor (props) {
        super(props);

        console.log("props", props);

        this.close_cb = props.close_cb;
        this.add_cb = props.add_cb;
        this.png_ref = props.png_ref;

        this.state = {
            selected_id : 0,
            dev_info : null
        }

        this.select_cb = (id) => {
            console.log("selected for adding", id);

            this.setState({
                selected_id : id
            })
        }

        this.confirm_device_cb = (dev_data) => {
            this.setState({
                device_confirmed : true,
            });
        }

        this.set_info_cb = (dev_info) => {
            console.log("Setting", dev_info);
            this.setState({
                input_info : dev_info
            });
        }

        this.add_device_cb = () => {
            // Send here add device request to BACK [this.state.dev_info]
            console.log(this.state);
            this.close_cb();
        }
    }

    render() {
        return (
            <div>
                <div className='popup-add'>
                    <div className='popup-add-inner'>
                        <div id="popup-add-dev-header">
                            <div className="popup-add-text-label center-pos">Add new device</div>
                            <div className="popup-close-window">
                                <img src={process.env.PUBLIC_URL + 'Resources/button_popup_close.png'} onClick={this.close_cb}></img>
                            </div>
                        </div>

                        <div> 
                        {this.state.device_confirmed ? 
                                <DeviceSetup 
                                    dev_data={scanned_devices.find(item => item.id == this.state.selected_id)}
                                    set_info_scb={info => this.set_info_cb(info)}
                                /> :
                                <DeviceCardList
                                    select_cb={this.select_cb}
                                />
                            }
                        </div>

                        <div className="popup-buttons-container center-pos">
                            <button className="add-button add-button-cancel" onClick={this.close_cb}>Cancel</button>
                            <button 
                                className={"add-button add-button-add " + (scanned_devices.length ? "" : "button-disabled")}
                                onClick={this.state.device_confirmed ? this.add_device_cb : this.confirm_device_cb} 
                                disabled={scanned_devices.length ? "" : "disabled"}>
                                    {this.state.device_confirmed ? 'Add device' : 'Continue'}
                            </button> 
                        </div>
                    {/* ВСТАВЛЯЙ СЮДИ КОД, АЛЕ 2-га КАРТИНКА ДОДАВАННЯ ДАТЧИКА, ТАМ ДЕ ПОЛЯ  */}
                    {/* <p> ВСТАВЛЯЙ СЮДИ КОД, АЛЕ 2-га КАРТИНКА ДОДАВАННЯ ДАТЧИКА, ТАМ ДЕ ПОЛЯ ЗАПОВНЯЕМ </p> */}
                    </div>
                </div>

            </div>
        )
    }
}

export default AddDevicePopup;