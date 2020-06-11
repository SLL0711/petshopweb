import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

// 全局状态管理
const state = {
    name: 'sll'
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store
