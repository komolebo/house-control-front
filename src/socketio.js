export const SENSOR_LIST_CHANGED = "sensor_list_changed";


class SocketHandler {
    constructor() {
        this.subscriptions = {};

        this.socket = new WebSocket('ws://192.168.1.12:8000/ws/sensor');

        this.socket.onmessage = function(e) {
            var data = JSON.parse(e.data);
            var msg = data['message'];
            var payload = data['payload'];

            if (msg in this.subscriptions) {
                this.subscriptions[msg].forEach(callback => {
                    callback(payload);
                });
            }
            
            console.log(msg);
        }.bind(this);

        this.socket.onclose = function(e) {
            console.error("socket is closed: " + e);
        };
    }

    subscribe(msg, callback) {
        if (msg in this.subscriptions) {
            this.subscriptions[msg].push(callback);
        }
        else {
            this.subscriptions[msg] = [callback];
        }
    }
}

var socketHandler = new SocketHandler();

export {
    socketHandler
}

