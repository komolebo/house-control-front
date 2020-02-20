class SocketHandler {

    constructor() {
        this.event_data = {};
        this.socket = new WebSocket('ws://192.168.1.12:8000/ws/sensor');
        this.socket.onmessage = function(e) {
            var data = JSON.parse(e.data);
            var message = data['message'];
            
            this.event(message);
            // console.log(data['message']);
        }.bind(this);
        this.socket.onclose = function(e) {
            console.err("socket is closed: " + e);
        }.bind(this);
    }

    subscribe(event, callback) {
        if (event in this.event_data) {
            this.event_data[event].push(callback);
        }
        else {
            this.event_data[event] = [callback];
        }
    }

    event(event) {
        if (event in this.event_data) {
            this.event_data[event].forEach(callback => {
                callback();
            });
        }
    }
}

var socketHandler = new SocketHandler();

export default socketHandler;

