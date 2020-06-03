import React, {Component} from 'react';
import './InfoBar.css';
import NotificationPopup from './popups/notification/Notification'

class InfoBar extends Component {

    constructor (props) {
        super(props);
        this.onpopup = props.onpopup;
        
        this.showNotificationPopup = () => {
            this.onpopup(NotificationPopup, {
                // positionSource : this.refArr[id],
                // update_cb : this.state.dev_info.find(el => el.id == id).update ? this.updateReqCb : null,
                notify_cb : this.notifyReqCb,
            });
            
            this.setState({
                devId : -1,
                // positionSource : this.refArr[id]
            })
        };
    }

    render() {
        return (
            <div id="infobar">
                <div id="infobar-items">
                    <div className="infobar-item">
                        <div className="infobar-username">Username</div>
                        <img className="infobar-user-ico" src={process.env.PUBLIC_URL + 'Resources/ico_user.png'}></img>
                    </div>
                    <img className="infobar-item" src={process.env.PUBLIC_URL + 'Resources/ico_notification_active.png'} onClick={this.showNotificationPopup}></img>
                    <img className="infobar-item" src={process.env.PUBLIC_URL + 'Resources/ico_faq.png'}></img>
                </div>
            </div>
        )
    }
}

export default InfoBar;