// import { Prefix } from "../../libs"
import { Base64 } from 'js-base64';

const state = {  
    game_id: "",
    game_name: "",
    version: "",
    game_host: "",
    game_port: 0,
    api_host: "",
    redirect_url: "",
    secure: true,
    debug: true
}

const getters = {
    // 
    gameServer: (state, getters, rootState, rootGetters) => {
        // const game_host = state.game_host;
        // const game_port = state.game_port;
        // const secure = state.secure;
        // const protocol = secure ? "wss" : "ws";
        // return `${protocol}://${game_host}:${game_port}/ws`;
        return `ws://13.230.92.57:8081/ws`;
    },
    // 
    api_server: (state, getters, rootState, rootGetters) => {
        const api_host = state.api_host;
        const secure = state.secure;
        const protocol = secure ? "https" : "http";
        return `${protocol}://${api_host}`;
    },
    // 
    token_key: (state, getters, rootState, rootGetters) => {
        const game_name = state.game_name;
        const version = state.version;
        const val = [Prefix, game_name, version].join("_");
        return Base64.encode(val);
    }
}

const actions = {
    // 
    setConfig({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
        commit("setConfig", payload);
    }
}

const mutations = {
    // 
    setConfig(state, payload) {
        const properties = Object.keys(payload);
        properties.forEach(key => {
            state[key] = payload[key];
        });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}