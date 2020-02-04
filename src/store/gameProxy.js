import { Base64 } from 'js-base64';
import { Command , CommandMap } from '../libs'

console.log("gameproxy置入")

export function gameProxy(proxy) {
console.log(proxy,"gameproxy匯出")
    
    return store => {
        proxy.store = store;
        // console.log(proxy.store,"gameproxy連接成功3")
        proxy.onopen = (e, proxy) => {
        console.log(proxy,"gameproxy呼叫proxy.onopen")
            // store.dispatch("log/append", ["onopen"]);
            store.dispatch("socket/onopen", {});
        };
        // console.log(proxy,"gameproxy連接成功4")
        proxy.onclose = (e, proxy) => {
            store.dispatch("socket/onclose", {});
            store.dispatch("log/append", ["onclose"]);
        };

        proxy.onmessage = (e, proxy) => {
            const store = proxy.store;
            const payload = JSON.parse(Base64.decode(e.data));
            const { cmd } = payload;
            switch (cmd) {
                case Command.S2C_PingPongAck:
                    break;
                default:
                    // console.log("gameProxy 收到訊息",["onmessage", CommandMap[cmd], payload])
                    // store.dispatch("log/append", ["onmessage", CommandMap[cmd], payload]);
                    break;
            }
            store.dispatch("socket/onmessage", payload);
        };

        proxy.onerror = (e, proxy) => {
            store.dispatch("socket/onerror", {});
            store.dispatch("log/append", ["onerror", e]);
        };
        // proxy.connect(`ws://13.230.92.57:8081/ws`);
        store.subscribeAction((action, state) => {
            // console.log(action,"subAct觸發");
            const { type, payload } = action;
            switch (type) {
                case "socket/connect":
                    // proxy.connect(`ws://13.230.92.57:8081/ws`);
                    console.log("socket/cone");
                    const { gameServer } = payload;
                    proxy.connect(gameServer);
                    // proxy.store.dispatch("log/append", ["connect", gameServer]);
                    break;
                case "socket/send":
                    console.log("發送訊息skt",payload);
                    const { cmd } = payload;
                    switch (cmd) {
                        case Command.C2S_PingPong:
                            break;
                        default:
                            // proxy.store.dispatch("log/append", ["send", CommandMap[cmd], payload]);
                            break;
                    }
                    proxy.send(payload);
                    break;
            }
        });

        // store.subscribe((mutation, state) => {

        // });
    }
}