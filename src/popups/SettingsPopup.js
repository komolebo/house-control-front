import React, {Component} from 'react';
import './SettingsPopup.css';


const TOP_OFFSET = 30;
const X_OFFSET = 0;

const STICK_GAP = 100;
const DISAPPEAR_GAP = 50;


class SettingsPopup extends Component {
    constructor (props) {
        super(props);
        this.closePopup = props.onclose;
        this.pos_src = props.positionSource;
        this.update_cb = props.onupdate;
        this.remove_cb = props.onremove;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.updateView = this.updateView.bind(this);
        this.getXPos = this.getXPos.bind(this);
        this.getYPos = this.getYPos.bind(this);

        this.state = {
            update: ((props.onupdate != null) ? true : false),
            remove: true
        }
    }

    getYPos() {
        let src_top = this.pos_src.getBoundingClientRect().top - TOP_OFFSET;
        if (this.state) {
            let remaining_gap = this.state.height - src_top;
            if (remaining_gap < DISAPPEAR_GAP) {
                this.closePopup();
                return -1;
            }
            else if (remaining_gap < STICK_GAP ) {
                src_top = this.state.height - STICK_GAP;
            }
            else { /* Do nothing with src_top */ }
        }
        return src_top;
    }
    getXPos() {
        return this.pos_src.getBoundingClientRect().right - X_OFFSET;
    }

    updateView() {
        let top = this.getYPos();
        let right = this.getXPos();

        if (top >= 0 && right >= 0 && this.state.width) {
            this.setState({
                styles: {
                    top: top,
                    right: this.state.width - right
                }
            })
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.updateView(), 1000 / 3);
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        // console.log("width", window.innerWidth);
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            this.state.styles ? (
            <div>
                <div className='popup-settings'>
                    <div className='popup-settings-inner' style={this.state.styles}  onMouseLeave={this.closePopup}>
                        {this.state.update ? (
                        <div id="popup-setting-item">
                            <img src={process.env.PUBLIC_URL + 'Resources/ico_settings_device_update.png'} onClick={this.update_cb}/>
                            <div className="popup-setting-update popup-setting-text">Update</div>
                        </div>
                        ) : null 
                        }

                        <div id="popup-setting-item">
                            <img src={process.env.PUBLIC_URL + 'Resources/ico_settings_device_remove.png'} onClick={this.remove_cb}/>
                            <div className="popup-setting-remove popup-setting-text">Delete</div>
                        </div>
                    </div>
                </div>
            </div>
            ) : <div/>
        )
    }
}

export default SettingsPopup;