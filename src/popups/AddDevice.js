import React, {Component} from 'react';
import './AddDevice.css';
import './Common.css';
import SelectCheckbox from '../components/SelectCheckbox'

const scanned_devices = [
    {name: 'Smoke Detector', png: 'Resources/device_smoke_{state}.png'},
    {name: 'Leak Detector', png: 'Resources/device_leak.png'},
]


class DeviceCard extends Component {
    constructor(props) {
        super(props);

        this.click_cb = props.click_cb;
        this.device_data = props.dev_data;
        this.checkable = props.checkable;

        this.state = {
            checked : props.checked
        }

        this.onclick = () => {
            if (this.click_cb) { this.click_cb(); }

            this.setState({
                checked : !this.state.checked
            })
        }
    }

    render() {
        return <div className={"scan-dev-card " + (this.state.checked ? "border-active" : "border-inactive")}>
            {this.checkable ? 
                <div id="scan-checkbox-container">
                    <SelectCheckbox 
                        onclick={this.onclick}
                        checked={this.state.checked}/>
                </div>
            : null}

            <div className="scanned-dev-card-ico">
                <img src={process.env.PUBLIC_URL + this.device_data.png.replace("{state}", (this.state.checked ? "active" : "inactive"))}/>
            </div>
            <div className={"dev-name-under-ico " + (this.state.checked ? "selected-col" : "")}>
                {this.device_data.name}
            </div>
        </div>
    };
}


function noDeviceFound() {
    
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

        this.state = {
            checked : this.checked
        }

        this.updateState = () => {
            // this.onclick();
            this.setState({
                checked : !this.state.checked
            })
        }
    }

    render() {
        return <div id="scan-dev-info-section"> 
                <DeviceCard
                    click_cb={null}
                    dev_data={scanned_devices[0]}
                    checked={true}
                    checkable={true}
                />
                <DeviceCard
                    click_cb={null}
                    dev_data={scanned_devices[1]}
                    checked={false}
                    checkable={true}
                />
            {/* // !scanned_devices ? null : (
            //     scanned_devices.length == 0 ?
            //         noDeviceFound() : (
            //         scanned_devices.length == 1 ?
            //             oneDeviceFound(scanned_devices[0]) : (
            //             scanned_devices.length == 2 ? 
            //                     twoDevicesFound(scanned_devices) :
            //                     manyDevicesFound(scanned_devices)
            //             )
            //         )  
            //     ) */}
            
        </div>
    };
}


class AddDevicePopup extends Component {

    constructor (props) {
        super(props);

        console.log("props", props);

        this.close_cb = props.close_cb;
        this.add_cb = props.add_cb;
        this.png_ref = props.png_ref;

        this.onadd = (data) => {
            // this.add_cb(data);
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

                        <div className='center-pos add-ico'> 
                            {/* {listDevices(scanned_devices)} */}
                            <DeviceCardList/>
                        </div>

                        <div className="popup-buttons-container center-pos">
                            <button className="add-button add-button-cancel" onClick={this.close_cb}>Cancel</button>
                            <button className="add-button add-button-add" onClick={this.onadd}>Continue</button> 
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