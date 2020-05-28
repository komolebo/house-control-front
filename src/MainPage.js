import React, {Component} from 'react';
import './MainPage.css';
import NavMenu from './Menu'

class MainPage extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <div id="main-page">
                <div id="nav-bar">
                    <div id="menu-logo-section">
                        <div id="menu-logo">
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
                    <p><strong>1. Main Content</strong></p>
                </div> 
            </div>

        )
    }
}

export default MainPage;