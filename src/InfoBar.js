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
            <div>
                {/* ВСТАВЛЯЙ СЮДИ HTML КОД */}
                <p color="white">ВСТАВЛЯЙ СЮДИ HTML КОД</p>
            </div>
        )
    }
}

export default InfoBar;