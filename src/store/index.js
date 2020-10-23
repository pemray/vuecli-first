// vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
  state: {
    num: 0,
    Agent: {}
  },
  mutations: {
    RefreshAgent (state, Agent = {}) {
      if (Agent.MemberID) {
        state.Agent = Agent
        window.localStorage.setItem('Agent', JSON.stringify(Agent))
      } else {
        console.log('store-更新Agent对象失败,对象不是合法的')
      }
    }
  }
})
export default store
