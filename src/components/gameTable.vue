<template>
  <div class="table" style="width:100%">
    <h2 :v-model="$store.state.socket.choosetime">{{$store.state.socket.choosetime}}</h2>
    <div style="position:absolute;bottom: 0px; width:80%; margin:auto ">
        <ul v-show="$store.state.socket.showhandcards" style="width:100%;height:25vh;display:flex; clear: both;">
          <li  v-for="(item, index) in $store.state.socket.handcards" :key="index" style="border:3px #FFAC55 solid;margin-left:-3%;float:left;width:10%;text-align:center; height:80%; margin:2px;background:#999;color:#fff;display:block;">
            <img :src="'assets/poker_card/'+item+'.png'" alt="">
            <!-- index:{{index}}<br>
            cards:  {{item}}  -->
          </li>
        </ul>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState("game", ["gameState"]),
  },
  name: 'gameTable',
  data () {
    return {
        btn1Open:false,
        roomList:[],
        respon: [],
        roomlistwrap:false,
        classList:{
            active: true,
            hasError: true
        }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    ...mapActions("socket", ["CP_PlayerListRooms","CP_PlayerJoinRoom"]),
    room() {
      this.CP_PlayerListRooms();
      this.roomList = this.$store.state.socket.roomList;
      console.log(this.roomList,"WHATTTT" ,this.$store.state.socket.roomList);
      this.roomlistwrap =! this.roomlistwrap;
    },
    btnopen(){
          this.btn1Open =! this.btn1Open;
          this.getListRoom();
          console.log(this.btn1Open);
    },
    joinRoom(item){
      // console.log(item.id);
      let payload = item.id;
      this.$store.state.socket.roomType = item.id;  //直接修改state 待修正
      this.CP_PlayerJoinRoom(payload);
    }

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
