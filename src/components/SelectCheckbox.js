import React, {Component} from 'react';
import './SelectCheckbox.css'

const CHECKBOX_PATH = 'Resources/checkbox_select_{state}.png';

class SelectCheckbox extends Component {
    constructor(props) {
        super(props);

        this.onclick = props.onclick;
        this.checked = props.checked;

        this.state = {
            checked : this.checked
        }

        this.updateState = () => {
            this.onclick();
            this.setState({
                checked : !this.state.checked
            })
        }
    }

    render() {
        return <div id="scanned-dev-checkbox">
            <img src={process.env.PUBLIC_URL + CHECKBOX_PATH.replace('{state}', this.state.checked ? "active" : "inactive")} 
                onClick={this.updateState}/>
        </div>
    }
}

export default SelectCheckbox