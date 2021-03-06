import React, {Component} from 'react';
import './Menu.css';

const menu_data = [
    {id: 0, png: "./Resources/main_menu_home",       text: "Home" },
    {id: 1, png: "./Resources/main_menu_rooms",      text: "Rooms" },
    {id: 2, png: "./Resources/main_menu_devices",    text: "Devices" },
    {id: 3, png: "./Resources/main_menu_statistics", text: "Statistics" },
    {id: 4, png: "./Resources/main_menu_routines",   text: "Routines" },
    {id: 5, png: "./Resources/main_menu_settings",   text: "Settings" },
    // {id: 6, png: "./Resources/main_menu_settings",   text: "Settings" },
    // {id: 7, png: "./Resources/main_menu_settings",   text: "Settings" },
]

class NavMenu extends Component {

    constructor (props) {
        super(props);

        this.state = {
            selectedItem : 2
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
    }

    handleClick(rowId) {
        console.log("handleClick ", rowId);

        this.setState({
            selectedItem : rowId
        })
    }

    render() {
        return (
            <div>
            <table id="main-menu">
                {menu_data.map(menu_item => (
                    <tr class="menu-row" onClick={() => this.handleClick(menu_item.id)} id={menu_item.id}>
                        <td className={"menu-item" + (menu_item.id == this.state.selectedItem ? " menu-border-selected" : " menu-border")}>
                            <img src={process.env.PUBLIC_URL + menu_item.png + (menu_item.id == this.state.selectedItem ? '_active':'_inactive') + '.png'}>
                            </img>
                        </td>
                        
                        <td  className={"menu-item menu-text " + (menu_item.id == this.state.selectedItem ? "menu-text-active" : "menu-text-inactive")}>
                            {menu_item.text}
                        </td>
                    </tr>
                ))}
            </table>
            </div>
        )
    }
}

export default NavMenu;