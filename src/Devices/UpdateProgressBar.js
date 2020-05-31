import React, {Component} from 'react';
// import Progress from 'react-bootstrap/Progress'
// import {ProgressBar} from 'react-bootstrap'
// import ProgressBar from "react-bootstrap/ProgressBar";
// import ProgressBar from "bootstrap-progress-bar";
// import CircularProgressbar from "bootstrap-progress-bar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
import './UpdateProgressBar.css';

class UpdateProgressBar extends Component {

    constructor (props) {
        super(props);

        this.x = props.x;
        this.y = props.y;
        this.oncomplete = props.oncomplete;

        this.state = {
            styles: {
                top: this.y - 20,
                left: this.x + 10
                // left: this.pos_src.getBoundingClientRect().left
            },
            percentage: 0
        };

        this.updateCounter = () => {
            let new_percentage = this.state.percentage + 1;

            if (new_percentage > 100) {
                clearInterval(this.interval);
                this.oncomplete();
            }

            this.setState({
                percentage: new_percentage
            })
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.updateCounter(), 200);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="update-progress-bar-container" style={this.state.styles}>
                <CircularProgressbar 
                    value={this.state.percentage}
                    text={this.state.percentage + '%'}
                    
                    // styles={buildStyles({
                    //     // Rotation of path and trail, in number of turns (0-1)
                    //     rotation: 0.25,
                     
                    //     // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    //     strokeLinecap: 'butt',
                     
                    //     // Text size
                    //     textSize: '16px',
                     
                    //     // How long animation takes to go from one percentage to another, in seconds
                    //     pathTransitionDuration: 0.5,
                     
                    //     // Can specify path transition in more detail, or remove it entirely
                    //     // pathTransition: 'none',
                     
                    //     // Colors
                    //     pathColor: `rgba(62, 152, 199, 1.0)`,
                    //     textColor: '#aaa',
                    //     trailColor: '#ff0000',
                    //     backgroundColor: '#ff0000',
                    //   })}
                />
                {/* <ProgressBar width="50%" message="Wait a moment please" /> */}
            </div>
        )
    }
}

export default UpdateProgressBar;