import React, {Component} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './UpdateProgressBar.css';
import socket from '../socketio';

class UpdateProgressBar extends Component {

    constructor (props) {
        super(props);

        this.x = props.x;
        this.y = props.y;
        this.oncomplete = props.oncomplete;

        socket.subscribe("update_dev_in_progress", (data) => { this.updateCounter(data["value"]); });
        socket.subscribe("update_dev_complete", () => { this.oncomplete(); });

        this.state = {
            styles: {
                top: this.y - 20,
                left: this.x + 10
                // left: this.pos_src.getBoundingClientRect().left
            },
            percentage: 0
        };

        this.updateCounter = (percent) => {
            percent *= 100;
            console.log("received: ", percent);
            if (percent > 100) {
                clearInterval(this.interval);
                this.oncomplete();
            }

            this.setState({
                percentage: percent
            })
        }
    }

    componentDidMount() {
        // this.interval = setInterval(() => this.updateCounter(), 200);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="update-progress-bar-container">
                <CircularProgressbar 
                    value={this.state.percentage}
                    text={(this.state.percentage | 0) + '%'}                    
                />
            </div>
        )
    }
}

export default UpdateProgressBar;