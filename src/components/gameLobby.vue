<template>
  <div class="lobby">
    <div class="popup_wrapper" v-show="roomlistwrap">
      <div style="height:100%;width:100vw;overflow:scroll;">
        <ul style="margin:30px 0px;width:90%;padding-left:5%;height:100%;display:flex; clear: both;">
          <li v-for="(item, index) in roomList" :key="index" style="float:left;width:30%;text-align:center; height:80vh; margin:10px;background:linear-gradient(to top, #004137, #006837);border:6px #333 solid;border-radius:30px;color:#fff;display:block;">
            <div style="height:80%">
             <img style="padding-top:12%;width:100%;z-index:2" src="@/assets/tablebtn.png" alt="">
            
            index:{{index}}, name:  {{item.name}} <br>
            一分 {{item.lower_amount}} 

            
            </div>
            <button @click="joinRoom(item)" style="width:100%;background:rgba(0,0,0,0);border:none;margin:0 auto"> 
             <img style="width:100%;z-index:2" src="@/assets/jointbtn.png" alt="">
            </button>
          </li>
        </ul>
      </div>
      <div class="popup_mask" v-show="roomlistwrap" @click="roomlistwrap =! roomlistwrap"></div>
    </div>
    <div class="popup_wrapper" v-show="$store.state.socket.handsuppop">
      <div style="text-align:center;width:400px;height:240px;margin:20vh auto;background:linear-gradient(to top, #004137, #006837);border:6px #333 solid;border-radius:30px;">
            <div style="height:66%;text-align:center">
              <div v-show="$store.state.socket.handsupCountdown > 0" :v-model="$store.state.socket.handsupCountdown"> 
               <h2 style="color:#ffffff">{{$store.state.socket.handsupCountdown}} 秒</h2> 
              <div style="width:60%;margin:0 auto;">
                <div v-for="(item, index) in $store.state.socket.handsupPlayer" :key="index" style="margin:2px;display:block;vertical-align : middle;width:50px;z-index:2;float:left">
                  <img style="display:inline-block;vertical-align : middle;width:50px;z-index:2;" :src='"@/assets/"+item+".png"' alt="">
                </div>
                <!-- <img style="width:100%;z-index:2" :src='"@/assets/"+item+".png"' alt=""> -->
              </div>
              <div style="width:100%;clear:both;display:flex">
                <button v-show="!$store.state.socket.handupAlready" @click="handup" style="padding-top:40px;height:40px;background:rgba(0,0,0,0);border:none;margin:0 auto"> 
                <img style="width:60%;z-index:2" src="@/assets/jointable.png" alt="">
                </button>
                <h4 v-show="$store.state.socket.handupAlready" style="padding-left:30%;color:#aaa"> 等待其他玩家...</h4>
              </div>
              </div>
              <h4 v-show="$store.state.socket.handsupCountdown == ''" style="color:#aaa"> 等待伺服器回應...</h4>
            </div>

      </div>
      <div class="popup_mask" v-show="$store.state.socket.handsuppop" @click="handupPop"></div>
    </div>
    <div style="width:100%;height:14%;padding:20px 0">
      <div style="border:2px #fff solid;color:#fff;border-radius:50%;height:78px;width:78px;background:rgba(0,0,0,0.6);font-size:20px;float:right; margin-right:20px">
        <img style="width:100%;height:100%" :src='"@/assets/"+$store.state.socket.playerimg+".png"' alt="">
      </div>
      <div style="border:2px #fff solid;color:#fff;border-radius:20px;font-weight:200; padding:10px 20px;background:rgba(0,0,0,0.6);font-size:20px;width:20%;float:right; margin-right:20px">
        帳號：{{$store.state.socket.playername}}<br>
        餘額：{{$store.state.socket.playerbalance}}
      </div>
    </div>
    <img style="width:450px;position:absolute;top:0px;left:0px" src="@/assets/logo.png" alt="">
    <img style="width:450px;position:absolute;bottom:0px;left:0px;z-index:1" src="@/assets/girl.png" alt="">
    <div style="padding-right: 8%">
      <button class="btn1" v-on:click="off" style="z-index:2;position:relative"> 
        <img style="height:100%;z-index:2" src="@/assets/champbtn.png" alt="">
      </button>
      <button class="btn1" v-on:click="room" style="z-index:2;position:relative"> 
        <img style="height:100%;z-index:2" src="@/assets/clubbtn.png" alt="">
      </button>
    </div>
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
        // handupPop:false,
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    ...mapActions("socket", ["CP_PlayerListRooms","CP_PlayerJoinRoom","CP_PlayerSeatHandUp","CP_Logout"]),
    room() {
      // this.CP_PlayerListRooms();
      this.roomList = this.$store.state.socket.roomList;
      console.log(this.roomList,"WHATTTT" ,this.$store.state.socket.roomList);
      this.roomlistwrap =! this.roomlistwrap;
    },
    joinRoom(item){
      let payload = item.id;
      this.$store.state.socket.roomType = item.id;  //直接修改state 待修正
      this.CP_PlayerJoinRoom(payload);
      // this.roomlistwrap =! this.roomlistwrap;
      this.handupPop =! this.handupPop;
    },
    off(){
      this.CP_Logout();
    },
    handupPop(){
      this.$store.state.socket.handsuppop =! this.$store.state.socket.handsuppop;
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
    /* width:30%; */
    height:65vh;
    float:right;
    background:rgba(0,0,0,0);
    margin-right:0px;
    border:none;
}
.lobby{
  background-image: url("../assets/lobbybg.png");
  background-size: cover;
  width:100%;
  height:100vh;
}
.lobby:after{
  display: block;
  clear:both;
}
</style>
