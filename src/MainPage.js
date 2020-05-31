import React, {Component} from 'react';
import './MainPage.css';
import NavMenu from './Menu'
import InfoBar from './InfoBar'
import DeviceTableHeader from './Devices/DeviceTableHeader'
import DeviceTable from './Devices/DeviceTable'

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popup_enabled: false,
            popup : null,
            data : null
        }

        this.showPopup = (popup, data1) => {
            console.log("pop: ", popup);
            console.log("data: ", data1);
            this.setState({
                popup_enabled : true,
                popup : popup,
                data : data1
            })
            console.log("show popup: ", this.state.popup_enabled);
        }

        this.closePopup = () => {
            this.setState({
                popup_enabled : false,
                popup : null,
                data : null
            })
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div id="main-page">
                <div id="nav-bar">
                    <div id="menu-logo-section">
                        <div id="menu-logo">
                            <img src={process.env.PUBLIC_URL + 'Resources/smart_home_system.svg'}></img>
                        </div>

                        <div id="menu-logo-section-text">
                            <a>smart home system</a>
                        </div>

                        <div id="menu">
                        </div>
                    </div>

                    <NavMenu/>
                </div>

                <div id="content-page">
                    
                    <div id="content-section-margin">
                        <InfoBar/>
                        <DeviceTableHeader onpopup={(popup, data) => this.showPopup(popup, data)}/>
                        <DeviceTable onpopup={(popup, data) => this.showPopup(popup, data)}/>
                    </div>
                </div> 

                {/* Popups */}
                <div>
                    {this.state.popup_enabled ? 
                        <this.state.popup
                            close_cb={this.closePopup}
                            data={this.state.data}
                        /> : null}
                    
                    {/* {this.state.popup_enabled ? this.state.popup : null} */}
                </div>
            </div>

        )
    }
}

export default MainPage;