// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Base64 } from 'js-base64'
import store from './store'
// import * as socketApi from './websocket'
// Vue.prototype.socketApi = socketApi
Vue.config.productionTip = false
// console.log(store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})



// var url = "ws://13.230.92.57:8081/ws";
// //建立websocket连接
// let ws = new WebSocket(url);
// ws.onopen = function(){
//   console.log("连接成功");
//   var msg = {
//     "cmd": 10013,
//     "data": {
//         "room_id": 1,
//         "table_rule": {
//             "table_type": 1,
//             "seat_count":  4,
//             "round_count": 4,
//         }
//     }
// };
//   ws.send(JSON.stringify(msg));
// };
// //连接错误
// ws.onerror = function(e){
//   console.log(e,"123");
// };
// //推送消息
// ws.addEventListener('message',function(event){
//   console.log(event)
// });
// ws.onmessage = function(data){
//   console.log(data);
// };



// //关闭连接
// ws.onclose = function(){
// }