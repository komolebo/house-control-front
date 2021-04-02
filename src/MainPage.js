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
            popup_params : null
        }

        this.showPopup = (popup, popup_params) => {
            this.setState({
                popup_enabled : true,
                popup : popup,
                popup_params : popup_params
            })
        }

        this.closePopup = () => {
            this.setState({
                popup_enabled : false,
                popup : null,
                popup_params : null
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
                        <InfoBar
                            onpopup={(popup, data) => this.showPopup(popup, data)}
                        />
                        <DeviceTableHeader 
                            onpopup={(popup, data) => this.showPopup(popup, data)}
                        />
                        <DeviceTable 
                            onpopup={(popup, data) => this.showPopup(popup, data)}
                        />
                    </div>
                </div> 

                {/* Popups */}
                <div>
                    {this.state.popup_enabled ? 
                        <this.state.popup
                            close_cb={this.closePopup}
                            data={this.state.popup_params}
                        /> : null}
                    
                    {/* {this.state.popup_enabled ? this.state.popup : null} */}
                </div>
            </div>

        )
    }
}

export default MainPage;