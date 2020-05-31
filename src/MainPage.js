import React, {Component} from 'react';
import './MainPage.css';
import NavMenu from './Menu'
import InfoBar from './InfoBar'
import DeviceTableHeader from './Devices/DeviceTableHeader'
import DeviceTable from './Devices/DeviceTable'

class MainPage extends Component {
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
                        <DeviceTableHeader/>
                        <DeviceTable/>
                    </div>
                </div> 
            </div>

        )
    }
}

export default MainPage;