import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    content: {
      head: '',
      data: '',
      time: '',
    }
  },
  mutations: {
    change(state,c) {
      state.content.head = c.head;
      state.content.data = c.data;
      let time = new Date();
      state.content.time = time.toLocaleString();
    }
  },
  getters: {},
  actions: {},
  modules: {}
})
