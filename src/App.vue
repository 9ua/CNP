<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
    name: 'App',
    data() {
      return {
        websock: null,
      }
    },
    created() {
      // let that = this;
      // that.global.initWebSocket();
      // that.global.initWebSocket();
    },
    destroyed() {
      // this.websock.close() //离开路由之后断开websocket连接
    },
    
    methods: {
// localSocket() {
//   let that = this;
//   if ("WebSocket" in window) {
//     console.log("您的瀏覽器支援 WebSocket!");
    
//     that.ws = new WebSocket(`ws://13.230.92.57:8081/ws`);
//     that.global.setWs(that.ws);
//     console.log(that.global.ws);
//     that.global.onopen();

//     that.ws.onclose = function() {
//       // 關閉 websocket
//       console.log("連線已關閉...");
//       setTimeout(() => {
//         that.localSocket();
//       }, 2000);
//     };
//   } else {
//     // 瀏覽器不支援 WebSocket
//     console.log("您的瀏覽器不支援 WebSocket!");
//   }
// }
    },
  }
var mediaQuery = window.matchMedia("(orientation: portrait)");
if (mediaQuery.matches) {
          console.log("竖屏")
        }else{
          console.log("横屏")
        }


</script>

<style lang="scss">
@import "./assets/style.scss";
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width:100%;
  height:100%;
}
body {
  width:100%;
  height:100vh;
  margin:0;
} */
</style>
