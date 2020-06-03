import React, {Component} from 'react';
import './Notification.css'
import '../Common.css'


export default class NotificationPopup extends Component {
    constructor (props) {
        super(props);
    }

    
    render() {
        return (
            <div>
                <div className='popup darken'>
                    <div className='popup-notify-inner'>
                        <div className='head'>
                            <div className='popup-text label white'>Notifications</div>
                            <div className='popup-count label white'>3</div>
                        </div>
                        <div className='notification-list'>
                            <div className='notity-item'>
                                <div className='item-ico'>
                                    <img className="" src={process.env.PUBLIC_URL + 'Resources/ico_notification_red.png'}></img>
                                </div>
                                <div className='item-data'>
                                    <div className='item-text'>Lorem ipsum dolor sit amet, 
                                        consectetur adipiscing elitdsadkl 
                                    </div>
                                    <div className='item-time time-style'>Today, 10:00 AM</div>
                                </div>
                                <div className='item-delete'>
                                    <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}></img>
                                </div>
                            </div>

                            <div className='notity-item'>
                                <div className='item-ico'>
                                    <img className="" src={process.env.PUBLIC_URL + 'Resources/ico_notification_red.png'}></img>
                                </div>
                                <div className='item-data'>
                                    <div className='item-text'>Lorem ipsum dolor sit amet, 
                                        consectetur adipiscing elit
                                    </div>
                                    <div className='item-time time-style'>Today, 10:00 AM</div>
                                    <div className='item-action'>
                                        <button className="button select-col action">Update</button>
                                    </div>
                                </div>
                                <div className='item-delete'>
                                    <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}></img>
                                </div>
                            </div>
                        </div>



                    </div>

                </div>
            </div>
        )
    }
}