import React, {Component} from 'react';
import './SensorsList.css';
import SensorItem  from './SensorItem';
import { Sensor } from './SensorItem';
import { popupAddNewSensor, SensorPopup } from "./SensorPopup";
import axios from 'axios';
// import { socketHandler } from '../socketio';
import * as messages from '../socketio';

axios.defaults.baseURL = 'http://192.168.1.15:8000/';


const displayProperties = [
    'ID',
    'Serial number',
    'Name',
    'Communication status',
    'Description',
    'Actions'
]

// class SensorsList extends Component {
//     state = { sensors: [] }

//     syncBackendData() {
//         console.log("syncing");
//         axios
//             .get('api/sensors/')
//             .then(response => this.setState({sensors: response.data}))
//             .catch(err => console.log(err));
//     }

//     componentDidMount() {
//         this.syncBackendData(); 
        
//         socketHandler.subscribe(messages.SENSOR_LIST_CHANGED, (dict_payload) => { 
//             this.syncBackendData(); 
//         });

//         socketHandler.subscribe(messages.DEVICE_LOST_COMM, (dict_payload) => {
//             this.updateSensorStatus(dict_payload["id"], false);
//         });

//         socketHandler.subscribe(messages.CLEAR_DEVICE_LOST_COMM, (dict_payload) => {
//             this.updateSensorStatus(dict_payload["id"], true);
//         });

//         socketHandler.subscribe(messages.DEV_ADD_SENSOR, (dict_payload) => {
//             this.addDevice(dict_payload);
//         });

//         socketHandler.subscribe(messages.DEV_NOTIFY_STATUS_DATA, (dict_payload) => {
//             this.changeData(dict_payload);
//         });
        
//     }

//     addDevice(device_data) {
//         this.state.sensors.push(new Sensor("123", 
//                                             device_data['device_type'], 
//                                             device_data["status"],
//                                             device_data["battery"]));
//         this.setState( { sensors: this.state.sensors } );
//     }

//     changeData(device_data) {
//         var index = this.state.sensors.length - 1;
//         this.state.sensors[index].status = device_data["value"];
//         this.setState( { sensors: this.state.sensors } );
//     }

//     addSensorItem(sn, name="Generic", status=true, description="Generic device, please append new data here") {
//         this.state.sensors.push(new Sensor(sn, name, status, description));
//         this.setState( { sensors: this.state.sensors } );
//     }

//     updateSensorStatus(sensorId, newStatus) {
//         this.state.sensors = this.state.sensors.map(sensor => {
//             if (sensor.id === sensorId) {
//                 sensor.status = newStatus;
//             }
//             return sensor;
//         });
//         this.setState( {sensors: this.state.sensors } );
//     }

//     /* Debug part only, will be replaced by socket.io functionality */
//     onAddItem() {
//         const sn = "0xFFAB8271940302";
//         console.log(this);
//         popupAddNewSensor(sn, this.addSensorItem.bind(this));

//     }

//     onRemoveItem(sensorId) {
//         console.log("removing " + sensorId);
//         axios
//             .delete('api/sensors/' + sensorId, {data: sensorId})
//             .then(res => {
//                 this.setState({sensors: this.state.sensors.filter(item => (item.id !== sensorId))});
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }

//     render() {
//         return (
//             <div>
//                 <table id='sensors'>
//                     <thead key="thead">
//                         <tr>
//                             { displayProperties.map( (sensorProperty) =>
//                                 <th> { sensorProperty } </th>
//                             )}
//                         </tr>
//                     </thead>
//                     <tbody key="tbody">
//                         { this.state.sensors.map( ( sensor ) =>
//                             <SensorItem data={sensor} onRemove={this.onRemoveItem.bind(this)} />
//                         )}
//                     </tbody>
//                 </table>
//                 <SensorPopup />

//                 {/* Debug part only, will be replaced by socket.io functionality */}
//                 <button className="sensor-btn-delete" onClick={this.onAddItem.bind(this)}>Simulate adding new device</button>
//             </div>
//         )
//     }
// }

// export default SensorsList;