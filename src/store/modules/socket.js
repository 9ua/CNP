// import { 
//   Command, 
//   CommandMap, 
//   Popup, 
//   MessageType,
//   GameState,
// } from "../../libs"
import { Command , CommandMap ,Position ,CardPattern } from "../../libs"
const state = {
  playerid :'',
  playername :'',
  playerbalance :'',
  playerimg :'',
  playergame_balance :'',
  roomList: [],
  position: Position.Init,
  roomType:'',
  handsup:false,
  handsupCountdown:'',
  handupAlready:false,
  players:[],
  showhandcards:false,
  handcards:[],
  choosetime:'',
  recommand:[],
  roomid:'',
  handsuppop:false,
  handsupPlayerConfirm:[],
  handsupPlayer:[],
  showdown:{},
  showdowncards:{},
  showdownstart:false,
  showdownsorts:{},
  showcardback:false,
  frontshow:false,
  middleshow:false,
  backshow:false,
  resoult:[],
  resoultshow:false,
}

const getters = {
    inLobby: (state, getters, rootState, rootGetters) => {
        console.log("GETTER-INLOBBY",state.position,Position.Lobby,Position.Room);
        return state.position === Position.Lobby;
    },
    inRoom: (state, getters, rootState, rootGetters) => {
        console.log("GETTER-INLOBBY",state.position,Position.Lobby,Position.Room);
        return state.position === Position.Room;
    }
}

const actions = {
  
  onopen({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
        console.log("socket-onopen",CommandMap[Command.CommonLogin]);
        dispatch(CommandMap[Command.CommonLogin], {});
  },
  
  onmessage({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
      const { cmd, data } = payload;
      console.log("收到回傳",CommandMap[cmd.toString()],"內容",payload);
      dispatch(CommandMap[cmd.toString()], payload);
  },
  
  onclose({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
      dispatch("setting/redirectMessage", { type: MessageType.SocketClose }, { root: true });
  },
  
  onerror({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
  },
  connect({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
      console.log("7788")
  },
  
  beforeSend({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
      const token = rootState.platform.token;
      const game_token = rootState.platform.game_token;
      const game_id = rootState.config.game_id;
      dispatch("send", {
          ...payload,
          meta: {
              token: [token],
              game_token: [game_token],
              game_id: [game_id]
          }
      });
  },
  
  send({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
  },
  
  CP_Login({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //   dispatch("setting/showLoading", {}, { root: true });
      console.log("CP_login","send",{ cmd: Command.CommonLogin });
      dispatch("send", { cmd: Command.CommonLogin });
  },

  CP_LoginAck({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
      console.log("loginack active")
    //   dispatch("setting/hideProgressing", {}, { root: true });
    //   dispatch("setting/hideLoading", {}, { root: true });
    //   dispatch("game/S2C_LoginAck", payload, { root: true });
  },
  CP_PlayerListRooms({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    dispatch("send", { cmd: Command.PlayerListRooms });
  },   
  CP_PlayerListRoomsAck({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    console.log("ListRooms active!",payload.data.rooms)
    // console.log(payload,"看看")
    commit("CP_PlayerListRoomsAck",payload);
  },
  
  CP_PlayerLeaveTableAck ({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    commit("CP_PlayerLeaveTableAck",payload);
},
  CP_PlayerJoinTable ({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
        console.log("加入牌桌動作",getters.inRoom);
        commit("CP_PlayerJoinTable",payload);
        console.log("加入牌桌動作",getters.inRoom);
  },
  CP_PlayerJoinLobbyAck ({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    console.log("加入大廳動作",getters.inLobby);
    // commit("CP_PlayerJoinLobbyAck",payload);
    commit("CP_PlayerJoinLobbyAck",payload);
    console.log("加入大廳動作",getters.inLobby);
  },
  
  CP_CommonPlayerInfoAck ({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    commit("CP_CommonPlayerInfoAck",payload);
  },
  CP_PlayerJoinRoom ({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    console.log("蛤？",{ cmd: Command.PlayerJoinRoom ,success: true,data :{ room_id: payload} })
    state.roomid = payload;
        dispatch("send", { cmd: Command.PlayerJoinRoom ,success: true ,data :{ room_id: payload} });
        // commit("CP_PlayerJoinRoom",payload);
        
  },
  
  CP_PlayerSeatCommitCards ({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
      let data = payload;
      console.log(payload,data);

    dispatch("send", { cmd: Command.PlayerSeatCommitCards , data });
  },
  CP_PlayerSeatHandUpAck ({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    commit("CP_PlayerSeatHandUpAck",payload);
  },
  
  CP_PlayerSeatHandUp ({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    dispatch("send", { cmd: Command.PlayerSeatHandUp,data :{ handup: true} });
  },
  CP_PlayerWaitToJoinTable({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    console.log("看妳唻耊藏啥小",{ cmd: Command.PlayerWaitToJoinTable ,data :{ room_id: payload} })
    dispatch("send", { cmd: Command.PlayerWaitToJoinTable ,data :{ room_id: state.roomid } });
    
  },
  CP_PlayerWaitToJoinTableAck({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    state.handsuppop = true;
    
  },
  CP_JoinRoomAck({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    dispatch("CP_PlayerWaitToJoinTable",{ room_id: payload })
  },

  
  CP_TableFlowInit({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //清理預設數據  重置桌面
  },

  
  CP_GamePlayerInfo({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //清理預設數據  重置桌面  刷新玩家資訊
    state.players = payload.data.player;
    console.log("桌上玩家資訊",payload.data.player);
  },
  
  CP_GameRoomRule({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //房間規則  樂透彩池
  },
  
  CP_GameTableRule({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //牌桌規則
            // table_type: 1
            // seat_count: 4
            // round_count: 1
            // poker_count: 1
            // joker_count: 0
            // handcard_count: 13
  },
  
  CP_TableFlowGameBegin({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //遊戲開始
  },
  
  CP_TableFlowGameRound({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //遊戲局數

  },
  CP_TableFlowRandomCard({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //切牌

  },
  
  CP_TableFlowShuffle({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //洗牌

  },
  
  CP_TableFlowDeal({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //發牌完成

  },
  CP_TableFlowSeatCard({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //玩家手牌取得
    commit("CP_TableFlowSeatCard",payload);
  },
  
  CP_TableFlowPatternRecommand({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //推薦牌型取得
    commit("CP_TableFlowPatternRecommand",payload);
  },
  
  CP_TableFlowDecision({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //刁牌開始
  },
  CP_TableFlowDecisionDone({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //刁牌時間結束
    commit("CP_TableFlowDecisionDone",payload);
  },
  
  CP_TableFlowChoosePattern({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //刁牌時間剩餘
    commit("CP_TableFlowChoosePattern",payload);
  },
  CP_TableFlowCompare({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //比牌開始
  },
  
  CP_TableFlowShowPlayerCards({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //比牌所有玩家手牌及開排順序
    commit("CP_TableFlowShowPlayerCards",payload);
  },
  
  CP_TableFlowShowFront({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //開牌前墩
    commit("CP_TableFlowShowFront",payload);
  },
  CP_TableFlowShowMiddle({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //開牌中墩
    commit("CP_TableFlowShowMiddle",payload);

  },
  CP_TableFlowShowBack({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //開牌後墩
    commit("CP_TableFlowShowBack",payload);
  },
  CP_TableFlowShowSpecial({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //開牌特殊牌型
  },
  CP_TableFlowShowGan({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //開牌打槍
  },
  CP_TableFlowShowHomerun({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //開牌全壘打
  },
  CP_TableFlowSettlement({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //結算開始
  },
  
  CP_TableFlowCompareResult({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //結算資訊
    commit("CP_TableFlowCompareResult",payload);
  },
  CP_TableFlowSettlementEnd({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //結算結束
  },
  CP_TableFlowNextRoundRemainTime({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    //新局開始確認倒數
  },
  CP_Logout({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
    dispatch("send", { cmd: Command.CommonLogout});
  },

  C2S_Logout({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
      dispatch("setting/showLoading", {}, { root: true });
      dispatch("beforeSend", { cmd: Command.C2S_Logout, data: payload });
  },

  S2C_LogoutAck({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
      dispatch("setting/hideLoading", {}, { root: true });
      dispatch("game/S2C_LogoutAck", payload, { root: true });
  },

  CP_TableFlowHandupPlayers({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
      console.log("倒數囉姐姐",payload);
    commit("CP_TableFlowHandupPlayers",payload);
  },

}

const mutations = {
    CP_PlayerListRoomsAck(state, payload) {
        state.roomList = payload.data.rooms
        console.log("commit改變roomlist",state.roomList)
    },
    CP_PlayerJoinLobbyAck() {
        state.position = Position.Lobby;
        console.log(state.position);
    },
    CP_PlayerJoinTable() {
        state.position = Position.Room;
        console.log(state.position);
    },
    
    CP_PlayerLeaveTableAck() {
        state.position = Position.Lobby;
        console.log(state.position);
    },
    CP_TableFlowHandupPlayers(state, payload) {
        state.handsupCountdown = payload.data.Time;
        if(state.handsupPlayer  != []){
            state.handsupPlayer = payload.data.players;
        }
        if (payload.data.handup_players.length > 0) {
            state.handsupPlayerConfirm = payload.data.handup_players;
        }
        for (let i =0 ;i < state.handsupPlayerConfirm.length; i++) {
            for (let j =0 ;j < state.handsupPlayer.length; j++){
                if (state.handsupPlayerConfirm[i] == state.handsupPlayer[j]){
                    console.log("有囉")
                    state.handsupPlayer[j] = 'light'+state.handsupPlayer[j];
                }
            }
        }
        if(state.handsupCountdown == 1) {
            setTimeout(() => {
                state.handsupCountdown = 0;
            }, 1000);
        }
        console.log("倒數囉哥哥",payload.data.handup_players);
    },
    CP_PlayerSeatHandUpAck(state, payload){
        state.handupAlready = ! state.handupAlready;
    },
    CP_TableFlowSeatCard(state, payload){
        state.showhandcards = true;
        state.handcards = payload.data.pokers;
        console.log(state.handcards);
    },
    CP_TableFlowPatternRecommand(state, payload){
        state.recommand = payload.data;
        console.log("真的假的",state.recommand,payload.data[0],CardPattern[2]);
        for (let i = 0 ; i < payload.data.length ;i++) {
            state.recommand[i].front_pattern_type = CardPattern[payload.data[i].front_pattern_type];
            state.recommand[i].middle_pattern_type = CardPattern[payload.data[i].middle_pattern_type];
            state.recommand[i].back_pattern_type = CardPattern[payload.data[i].back_pattern_type];
        }

    },
    CP_TableFlowChoosePattern(state, payload){
        state.choosetime = payload.data.time;
    },
    CP_TableFlowDecisionDone(state, payload){
        state.showhandcards = false;
        state.choosetime = 0;
    },
    CP_TableFlowShowPlayerCards(state, payload){
        state.showcardback = true;
        state.showdown = payload.data.seat_result;
        for (let i =0; i< payload.data.seat_result.length;i++){
            state.showdowncards[i] = payload.data.seat_result[i].cards;
        }
        console.log("開牌",state.showdowncards)
        state.showdownsorts = payload.data.show_card_sorts;
        state.showdownstart = true;
    },
    CP_TableFlowShowFront(state, payload){
        state.frontshow = true;
    },
    CP_TableFlowShowMiddle(state, payload){
        state.middleshow = true;
    },
    CP_TableFlowShowBack(state, payload){
        state.backshow = true;
    },
    CP_TableFlowCompareResult(state, payload){
        state.resoult = payload.data;
        state.resoultshow = true;
    },
    CP_CommonPlayerInfoAck(state, payload){
        state.playerid = payload.data.id;
        state.playername = payload.data.name;
        state.playerbalance = payload.data.balance;
        state.playerimg = payload.data.img;
        state.playergame_balance = payload.data.game_balance;
    },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}