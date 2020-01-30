import { Base64 } from 'js-base64';

export class SocketProxy {

    constructor() {
    }

    connect(url) {
        console.log("socketproxy-connect activate");
        this.socket = new WebSocket(url);
        this.socket.addEventListener("open", (evt) => {
            this.onopen(evt, this);
        });
        this.socket.addEventListener("close", (evt) => {
            this.onclose(evt, this);
        });
        this.socket.addEventListener("message", (evt) => {
            this.onmessage(evt, this);
        });
        this.socket.addEventListener("error", (evt) => {
            this.onerror(evt, this);
        });
    }

    send(data) {
        const code = Base64.encode(JSON.stringify(data));
        this.push(code);
    }

    push(data) {
        if (this.socket === undefined) {
            return;
        }
        if (this.socket.readyState === 1) {
            this.socket.send(data);
        }
        else if (this.socket.readyState === 0) {
            setTimeout(this.push, 500, data);
        }
    }

    readyState() {
        console.log("有沒有觸發啊");
        if (this.socket !== undefined) {
            console.log(this.socket.readyState);
            return this.socket.readyState;
        }
        return undefined;
    }

    close() {
        this.socket.close();
    }
}