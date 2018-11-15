import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    userId: -1,
    address: '',
    password: '',
    username: 'Victor'
}

const mutations = {
    inputId(state,id){
        state.userId = id;
    }
}

const getters = {

}

const actions = {

}

export default new Vuex.Store({state,mutations,getters,actions})