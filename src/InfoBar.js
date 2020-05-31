import React, {Component} from 'react';
import './InfoBar.css';


class InfoBar extends Component {

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(rowId) {
    }

    render() {
        return (
            <div id="infobar">
                <div id="infobar-items">
                    <div className="infobar-item">
                        <div className="infobar-username">Username</div>
                        <img className="infobar-user-ico" src={process.env.PUBLIC_URL + 'Resources/ico_user.png'}></img>
                    </div>
                    <img className="infobar-item" src={process.env.PUBLIC_URL + 'Resources/ico_notification_active.png'}></img>
                    <img className="infobar-item" src={process.env.PUBLIC_URL + 'Resources/ico_faq.png'}></img>
                </div>
            </div>
        )
    }
}

export default InfoBar;