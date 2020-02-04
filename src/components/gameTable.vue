<template>
  <div class="table" style="width:100%">
    <div class="popup_wrapper_2" v-show="$store.state.socket.choosetime > 0">
      <div style="height:100%;width:100%;display:flex;clear:both;">
        <ul style="width:100vh;height:100%;margin:20px 0;float:left;">
          <div style="display:flex;clear:both;height:30%;padding:10px 0">
            <li style="height:100%;width:60px">
              <h4 style="font-weight:200;font-size:14px;color:#fff;border:#fff 1px solid; padding:6px 14px;margin-top:50%;background:#84684C;border-radius:20px">前墩</h4>
            </li>
            <li @click="setcard(item,index)" :v-model="cardpicking[index]" v-for="(item, index) in cardpicking.slice(0, 3)" :key="index" style="height:100%"><img :src='"@/assets/poker_card/" + cardpicking[index] + ".png"' alt="" style="height:100%"></li>
            <div style="border:#fff 1px solid; border-radius:50%;width:10vh;height:10vh;margin:30px;text-align:center">
            <h1 style="font-size:28px;color:#fff" :v-model="$store.state.socket.choosetime">{{$store.state.socket.choosetime}}</h1>
            </div>
          </div>
          <div style="display:flex;clear:both;height:30%;padding:10px 0">
            <li style="height:100%;width:60px">
              <h4 style="font-weight:200;font-size:14px;color:#fff;border:#fff 1px solid; padding:6px 14px;margin-top:50%;background:#84684C;border-radius:20px">中墩</h4>
            </li>
            <li @click="setcard(item,index+3)" :v-model="cardpicking[index+3]" v-for="(item, index) in cardpicking.slice(3, 8)" :key="index" style="height:100%" ><img :src='"@/assets/poker_card/" + cardpicking[index+3] + ".png"' alt="" style="height:100%"></li>
          </div>
          <div style="display:flex;clear:both;height:30%;padding:10px 0">
            <li style="height:100%;width:60px">
              <h4 style="font-weight:200;font-size:14px;color:#fff;border:#fff 1px solid; padding:6px 14px;margin-top:50%;background:#84684C;border-radius:20px">後墩</h4>
            </li> 
            <li @click="setcard(item,index+8)" :v-model="cardpicking[index+8]" v-for="(item, index) in cardpicking.slice(8, 13)" :key="index" style="height:100%"><img :src='"@/assets/poker_card/" + cardpicking[index+8] + ".png"' alt="" style="height:100%"></li>
          </div>
        </ul>
        <div style="width:36%;height:100%;background:linear-gradient(40deg,#84684C, #CC9B66);border:#fff 1px solid;margin:20px 0;border-radius:20px;text-align:center">
          <h1 style="font-weight:200;color:#fff">推 薦 牌 型</h1>
          <div  style="text-align:center;display:flex; clear: both;width:90%;border-radius: 16px;color:#fff">
            <h4 style="width:100%;font-weight:200">前墩 |  中墩  |  後墩}</h4>
          </div>
          <div @click="setrecommand(item)"  v-for="(item, index) in $store.state.socket.recommand" :key="index" style="text-align:center;display:flex; clear: both;width:90%;border:#fff 1px solid; margin:3% 5%;border-radius: 16px;color:#fff">
            <h4 style="width:100%;font-weight:200">{{item.front_pattern_type}}  |  {{item.middle_pattern_type}}  |  {{item.back_pattern_type}}</h4>
          </div>
          <button @click="handconfirm()" style="padding-top:30px;height:40px;background:rgba(0,0,0,0);border:none;margin:0 auto"> 
             <img style="width:60%;z-index:2" src="@/assets/confirm.png" alt="">
          </button>
        </div>
      </div>
      <div class="popup_mask" v-show="$store.state.socket.choosetime > 0" @click="roomlistwrap =! roomlistwrap"></div>
    </div>
    <div class="popup_wrapper" v-if="$store.state.socket.resoultshow">
      <div style="text-align:center;width:50%;height:60%;margin:20vh auto;background:#e2e2e2;border:6px #333 solid;border-radius:30px;">
        <div style="background:#009145;height:40%;width:100%;border-radius:25px;">
          <!-- <img style="display:inline-block;vertical-align : middle;width:50px;z-index:2;" :src='"@/assets/"+$store.state.socket.playerimg+".png"' alt=""> -->
          <h2 style="color:#fff;padding:30px;margin:0px;font-size:40px;text-align:left">{{$store.state.socket.playername}}</h2>
          <h2 style="color:#fff;padding:0 30px;margin:0px;text-align:left">餘額 {{$store.state.socket.playerbalance}}</h2>
        </div>
        <div v-if="$store.state.socket.resoult.game_money[$store.state.socket.playerid] < 0" style="margin:2%;width: calc(96% - 40px); height:20%; background:#e2e2e2 ;box-shadow: 2px 2px 5px #aaa;border-left:#ED2A32 40px solid">
          <h2 style="color:#666;line-height:80px"><b style="float:left;padding-left:20px">結算金額 [{{$store.state.socket.resoult.points[$store.state.socket.playerid]}}分]</b><b style="float:right;padding-right:20px">{{$store.state.socket.resoult.game_money[$store.state.socket.playerid]}}</b></h2>
        </div>
        <div v-if="$store.state.socket.resoult.game_money[$store.state.socket.playerid] >= 0" style="margin:2%;width: calc(96% - 40px); height:20%; background:#e2e2e2 ;box-shadow: 2px 2px 5px #aaa;border-left:#009145 40px solid">
          <h2 style="color:#666;line-height:80px"><b style="float:left;padding-left:20px">結算金額 [{{$store.state.socket.resoult.points[$store.state.socket.playerid]}}分]</b><b style="float:right;padding-right:20px">{{$store.state.socket.resoult.game_money[$store.state.socket.playerid]}}</b></h2>
        </div>
        <div v-if="$store.state.socket.resoult.tax[$store.state.socket.playerid] > 0" style="margin:2%;width: calc(96% - 40px); height:20%; background:#e2e2e2 ;box-shadow: 2px 2px 5px #aaa;border-left:#ED2A32 40px solid">
          <h2 style="color:#666;line-height:80px"><b style="float:left;padding-left:20px">TAX</b><b style="float:right;padding-right:20px">{{$store.state.socket.resoult.tax[$store.state.socket.playerid]}}</b></h2>
        </div>
      </div>
     <!-- <h2 style="color:#fff">{{$store.state.socket.resoult}}</h2> -->
      <div class="popup_mask" v-if="$store.state.socket.resoultshow" @click="roomlistwrap =! roomlistwrap"></div>
    </div>
    <div style="height:74%;width:100%;">
      <ul class="playerinfo">
        <li v-for="(item, index) in $store.state.socket.players" :key="index">
          <div class="acc">
            <div class="acc_info" style="text-align:center">
          {{item.name}}<br>
          <img :src='"@/assets/" + item.img + ".png"' alt="" style="width:100%"><br>
          {{item.balance}}
          {{$store.state.socket.showdownstart}}
          {{index}}
            </div>
            <div v-if="$store.state.socket.showdownstart" class="acc_cards">
              <div style="display:flex;clear:both">
                <div style="width:40px;height:2px;"></div>
                <img v-show="!$store.state.socket.frontshow" src="@/assets/poker_card/000.png" alt="" style="width:40px">
                <img v-show="!$store.state.socket.frontshow" src="@/assets/poker_card/000.png" alt="" style="width:40px">
                <img v-show="!$store.state.socket.frontshow" src="@/assets/poker_card/000.png" alt="" style="width:40px">
                <img v-show="$store.state.socket.frontshow" :src='"@/assets/poker_card/" + $store.state.socket.showdowncards[index][0][0] + ".png"' alt="" style="width:40px">
                <img v-show="$store.state.socket.frontshow" :src='"@/assets/poker_card/" + $store.state.socket.showdowncards[index][0][1] + ".png"' alt="" style="width:40px">
                <img v-show="$store.state.socket.frontshow" :src='"@/assets/poker_card/" + $store.state.socket.showdowncards[index][0][2] + ".png"' alt="" style="width:40px">
              </div>
              <div style="display:flex;clear:both">
                <img v-show="!$store.state.socket.middleshow" src="@/assets/poker_card/000.png" alt="" style="width:40px">
                <img v-show="!$store.state.socket.middleshow" src="@/assets/poker_card/000.png" alt="" style="width:40px">
                <img v-show="!$store.state.socket.middleshow" src="@/assets/poker_card/000.png" alt="" style="width:40px">
                <img v-show="!$store.state.socket.middleshow" src="@/assets/poker_card/000.png" alt="" style="width:40px">
                <img v-show="!$store.state.socket.middleshow" src="@/assets/poker_card/000.png" alt="" style="width:40px">

                <img v-show="$store.state.socket.middleshow" :src='"@/assets/poker_card/" + $store.state.socket.showdowncards[index][1][0] + ".png"' alt="" style="width:40px">
                <img v-show="$store.state.socket.middleshow" :src='"@/assets/poker_card/" + $store.state.socket.showdowncards[index][1][1] + ".png"' alt="" style="width:40px">
                <img v-show="$store.state.socket.middleshow" :src='"@/assets/poker_card/" + $store.state.socket.showdowncards[index][1][2] + ".png"' alt="" style="width:40px">
                <img v-show="$store.state.socket.middleshow" :src='"@/assets/poker_card/" + $store.state.socket.showdowncards[index][1][3] + ".png"' alt="" style="width:40px">
                <img v-show="$store.state.socket.middleshow" :src='"@/assets/poker_card/" + $store.state.socket.showdowncards[index][1][4] + ".png"' alt="" style="width:40px">
              </div>
              <div style="display:flex;clear:both">
                <img v-show="!$store.state.socket.backshow" src="@/assets/poker_card/000.png" alt="" style="width:40px">
                <img v-show="!$store.state.socket.backshow" src="@/assets/poker_card/000.png" alt="" style="width:40px">
                <img v-show="!$store.state.socket.backshow" src="@/assets/poker_card/000.png" alt="" style="width:40px">
                <img v-show="!$store.state.socket.backshow" src="@/assets/poker_card/000.png" alt="" style="width:40px">
                <img v-show="!$store.state.socket.backshow" src="@/assets/poker_card/000.png" alt="" style="width:40px">

                <img v-show="$store.state.socket.backshow" :src='"@/assets/poker_card/" + $store.state.socket.showdowncards[index][2][0] + ".png"' alt="" style="width:40px">
                <img v-show="$store.state.socket.backshow" :src='"@/assets/poker_card/" + $store.state.socket.showdowncards[index][2][1] + ".png"' alt="" style="width:40px">
                <img v-show="$store.state.socket.backshow" :src='"@/assets/poker_card/" + $store.state.socket.showdowncards[index][2][2] + ".png"' alt="" style="width:40px">
                <img v-show="$store.state.socket.backshow" :src='"@/assets/poker_card/" + $store.state.socket.showdowncards[index][2][3] + ".png"' alt="" style="width:40px">
                <img v-show="$store.state.socket.backshow" :src='"@/assets/poker_card/" + $store.state.socket.showdowncards[index][2][4] + ".png"' alt="" style="width:40px">
              </div>

            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-show="$store.state.socket.showhandcards" style="position:absolute;bottom: 0px; width:84%;height:26%; margin:auto ;padding-left:8%;overflow:visible">
        <ul style="width:100%;display:flex; clear: both;">
          <li class="cardo" @click="choose(item,index)" v-for="(item, index) in $store.state.socket.handcards" :key="index" style="position:relative;float:left;width:7%;text-align:center; margin:2px;color:#fff;display:block;">
            <div v-show="cardcover[index]" class="mask" style="overflow:visible"></div>
            <!-- <img v-show="cardcover[index]" :src='"@/assets/poker_card/0.png"' alt="" style="width:100%;position:relative;left:0px;top:0px;z-index:2"> -->
            <img :src='"@/assets/poker_card/" + item + ".png"' alt="" style="position:relative;left:0px;top:0px;z-index:1">
            <!-- <div style=" position: absolute;top: 0;left: 0;width: 531px;height: 354px;background: rgba(101, 101, 101, 0.6);color: #ffffff; opacity: 0;"></div> -->
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
        },
        cardcover: [false,false,false,false,false,false,false,false,false,false,false,false,false],
        choosecard:'',
        choosecardindex:'',
        switchcard:'',
        switchcardindex:'',
        pickingcard:'',
        cardpicking:[0,0,0,0,0,0,0,0,0,0,0,0,0],
        cardpickingindex:['','','','','','','','','','','','',''],
        wrong:false,

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    ...mapActions("socket", ["CP_PlayerListRooms","CP_PlayerJoinRoom","CP_PlayerSeatCommitCards"]),
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
    },
    choose(item,index){
      this.cardcover[index] = !this.cardcover[index];
      console.log(this.cardcover,this.cardcover[index]);
      if (this.choosecard =='') {
        this.choosecard = item;
        this.choosecardindex = index;
      } else if (this.choosecard != '' && item != this.choosecard) {
        this.choosecard = item;
        this.choosecardindex = index;
      } else if ( item == this.choosecard) {
        this.choosecard = '';
        this.choosecardindex = '';
      }
      console.log("選中的牌",this.choosecard,this.choosecard == '')
    },
    switch (item, index){
      console.log("換一下");
      this.cardpicking[this.switchcardindex] = item;
      this.cardpicking[index] =this.switchcard;
      this.switchcard ='';
      this.switchcardindex='';
    },
    setrecommand(item ){
      // console.log(item)
      for (let i=0; i<3;i++) {
        this.cardpicking[i] = item.front[i]; 
      }
      for (let j=3; j<8;j++) {
        this.cardpicking[j] = item.middle[j-3];
      }

      for (let k=8; k<13;k++) {
        this.cardpicking[k] = item.back[k-8];
      }

      for (let l=0; l<13;l++) {
        this.cardcover[l] = true;
      }
      

    },
    handconfirm(){
      for (let i = 0; i< this.cardpicking.length;i++) {
        if (this.cardpicking[i] == 0) {
          console.log("未完成刁牌");
          this.wrong = true;
          break;
        } else {
          this.wrong = false;
        }
      }

      if (!this.wrong) {
          let aaa = this.cardpicking.slice(0, 3);
          let bbb = this.cardpicking.slice(3, 8);
          let ccc = this.cardpicking.slice(8, 13);
          let payload = {front: aaa, middle: bbb, back: ccc};
          console.log ("刁牌",payload)
          this.CP_PlayerSeatCommitCards(payload);
      }

      
    },
    setcard(item ,index){
      if (this.cardpicking[index] == 0){
        if (this.choosecard != '') {
          this.cardpicking[index] = this.choosecard;
          this.cardpickingindex[index] = this.choosecardindex;
          this.choosecard = ''; 
          this.choosecardindex = ''
        } else if (this.choosecard != 0 && this.switchcard != '') {
          this.switch(item,index);
        }
      } else if (this.cardpicking[index] != 0) {
        console.log("近來沒",this.choosecard )
        if (this.choosecard != '') {
          console.log("近來沒1")
          let aaa = this.cardpicking[index];
          let bbb = this.cardpickingindex[index];
          this.cardpicking[index] = this.choosecaed;
          this.cardpickingindex[index] = this.choosecardindex;
          this.choose(aaa,bbb);
        } else if (this.switchcard != ''){
          console.log("近來沒2")
          this.switch(item,index);
        } else if (this.switchcard == ''){
          console.log("近來沒3")
          this.switchcard = this.cardpicking[index];
          this.switchcardindex = index;
        }
      }

      console.log(this.cardpicking[index])
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
.table{
  background-image: url("../assets/table.png");
  background-size: cover;
  width:100%;
  height:100%;
  margin-top:-16px;
}
.table:after{
  display: block;
  clear:both;
}
.mask {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
}
.cardo {
  margin:0px !important;
}
.playerinfo{ height:100%}
.playerinfo li:nth-child(2) .acc {
  width:320px;
  float:right;
  position: absolute;
  top:30%;
  left: 2%;
}
.playerinfo li:nth-child(2) .acc .acc_info{
  float: left;
}
.playerinfo li:nth-child(2) .acc .acc_cards{
  float: left;
  padding-left:20px;
}
.playerinfo li:nth-child(3) .acc {
  width:320px;
  float:right;
  position: absolute;
  top:4%;
  left:20%;
}
.playerinfo li:nth-child(3) .acc .acc_info{
  float: left;
}
.playerinfo li:nth-child(3) .acc .acc_cards{
  float: left;
  padding-left:20px;
}
.playerinfo li:nth-child(4) .acc {
  width:320px;
  float:right;
  position: absolute;
  top:4%;
  right:20%;
}
.playerinfo li:nth-child(4) .acc .acc_info{
  float: right;
}
.playerinfo li:nth-child(4) .acc .acc_cards{
  float: right;
  padding-right:20px;
}
.playerinfo li:nth-child(5) .acc {
  width:320px;
  float:right;
  position: absolute;
  top:30%;
  right:2%;
}
.playerinfo li:nth-child(5) .acc .acc_info{
  float: right;
}
.playerinfo li:nth-child(5) .acc .acc_cards{
  float: right;
  padding-right:20px;
}
.playerinfo li:nth-child(1) .acc {
  width:320px;
  float:right;
  position: absolute;
  bottom:4%;
  left:40%;
}
.playerinfo li:nth-child(1) .acc .acc_info{
  float: left;
}
.playerinfo li:nth-child(1) .acc .acc_cards{
  float: left;
  padding-left:20px;
}
.playerinfo li{
  width:20%;
  float:left;
}

.playerinfo li .acc .acc_info{
  padding:8px;
  /* margin:4px; */
  color:#fff;
  background: rgba(0,0,0,0.6);
  border:#fff 2px solid;
  border-radius: 22px;
}
</style>
