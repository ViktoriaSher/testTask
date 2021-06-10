import {
  createStore
} from "vuex";

export default createStore({
  state: {


    listofCurrencies: []

  },
  getters: {

    getWholeList(state) {
      return state.listofCurrencies
    }
  },
  mutations: {
    updateList(state, list) {
      state.listofCurrencies = list
    },
  },
  actions: {
    async fetchList(ctx) {
      const res = await fetch(`https://www.cbr-xml-daily.ru/daily_json.js`)
      const list = await res.json()
      ctx.commit('updateList', list)
    }
  },
  modules: {},
});