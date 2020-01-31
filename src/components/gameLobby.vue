<template>
  <div class="lobby">
    <div class="popup_wrapper" v-show="roomlistwrap">
      <div style="height:100%;width:100vw;overflow:scroll;">
        <ul  style="width:3000px;height:100%;display:flex; clear: both;">
          <li v-for="(item, index) in roomList" :key="index" style="float:left;width:30vw;text-align:center; height:80vh; margin:20px;background:#999;color:#fff;display:block;">
            <div style="height:80%">
            index:{{index}}, name:  {{item.name}} <br>
            一分 {{item.lower_amount}} 

            
            </div>
            <button @click="joinRoom(item)" style="height:40px;background:red;margin:0 auto"> 加入牌桌</button>
          </li>
        </ul>
      </div>
      <div class="popup_mask" v-show="roomlistwrap" @click="roomlistwrap =! roomlistwrap"></div>
    </div>
    <div class="popup_wrapper" v-show="handupPop">
      <div style="text-align:center;background:#333;width:400px;height:200px;margin:20vh auto;">
            <div :v-model="$store.state.socket.handsupCountdown"> 
             <h2 style="color:#ffffff">{{$store.state.socket.handsupCountdown}} 秒</h2> 
            </div>
            <button v-show="$store.state.socket.handupAlready === false" @click="handup" style="height:40px;background:red;margin:0 auto"> 確認</button>
      </div>
      <div class="popup_mask" v-show="handupPop" @click="handupPop =! handupPop"></div>
    </div>
      <h2 class="divid">123</h2>
      <button class="btn1" v-on:click="room"> 俱樂部 </button>
      <button class="btn1" v-on:click="off"> 錦標賽 </button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState("game", ["gameState"]),
  },
  name: 'gameLobby',
  data () {
    return {
        btn1Open:false,
        roomList:[],
        respon: [],
        roomlistwrap:false,
        handupPop:false,
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    ...mapActions("socket", ["CP_PlayerListRooms","CP_PlayerJoinRoom","CP_PlayerSeatHandUp","CP_Logout"]),
    room() {
      this.CP_PlayerListRooms();
      this.roomList = this.$store.state.socket.roomList;
      console.log(this.roomList,"WHATTTT" ,this.$store.state.socket.roomList);
      this.roomlistwrap =! this.roomlistwrap;
    },
    joinRoom(item){
      let payload = item.id;
      this.$store.state.socket.roomType = item.id;  //直接修改state 待修正
      this.CP_PlayerJoinRoom(payload);
      this.roomlistwrap =! this.roomlistwrap;
      this.handupPop =! this.handupPop;
    },
    off(){
      this.CP_Logout();
    },
    handup(){
      this.CP_PlayerSeatHandUp();
      
    },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.btn1 {
    width:30%;
    height:60vh;
    background: #c9c9c9;
    float:right;
    margin-right:30px;
}
</style>
