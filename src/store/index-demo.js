import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    content: {
      head:  '',
      data: '',
    }
  },
  mutations: {
    add(state) {
      state.count++
      console.log(state)
    }
  },
  getters: {
    power(state123) {
      return state123.count * state123.count
    }
  },
  actions: {
  },
  modules: {
  }
})
