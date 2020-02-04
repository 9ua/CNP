<template>
  <div class="hello">
    <game-lobby v-if="inLobby"></game-lobby>
    <game-table v-if="inRoom"></game-table>
  </div>
</template>

<script>
import GameLobby from "./gameLobby";
import GameTable from "./gameTable";
import { mapGetters, mapState, mapActions } from "vuex";


export default {
  components: {
    GameLobby,
    GameTable
  },
  computed: {
    ...mapGetters("socket", ["inLobby", "inRoom"]),
  },
  data () {
    return {

    }
  },
  created() {
    // let that = this;
    // this.hash();
    // console.log(that.global.ws,"999");
  },
  mounted() {
    this.wsConnect();
      // that.global.websocketsend(actions);
    // console.log(that.global.ws,"999");

  },
  methods: {
    wsConnect(){
      let gameServer =`ws://13.230.92.57:8081/ws`;
      this.$store.dispatch("socket/connect", { gameServer });
    },
    getConfigResult (res) {
      // 接收回调函数返回数据的方法
      console.log(res,"callback")
    },
    websocketToLogin () {
      // 【agentData：发送的参数；this.getConfigResult：回调方法】
      // this.socketApi.sendSock(getPlaceRevenue, this.getConfigResult)
    },
    hash (){
      let actions = {
        "cmd": 11001,
        "meta": {},
      };
      // this.socketApi.sendSock(actions,this.getConfigResult);
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
.hello {
  height: 100%;
  overflow:hidden;
}
.hello:after{
  min-height: 100%;
  clear: both; 
}
</style>
