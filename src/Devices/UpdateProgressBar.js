import React, {Component} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
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
            <div className="update-progress-bar-container">
                <CircularProgressbar 
                    value={this.state.percentage}
                    text={this.state.percentage + '%'}                    
                />
            </div>
        )
    }
}

export default UpdateProgressBar;