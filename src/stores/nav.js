export default {
  namespaced: true,
  state: {
    nav: [],
    active: '/',
  },
  mutations: {
    SET_NAV(state, nav) {
      state.nav = nav;
    },
    SET_ACTIVE(state, active) {
      state.active = active;
    }
  },
  actions: {
    ACTION_SET_NAV_ACTIVE({ commit }, active) {
      commit('SET_ACTIVE', active);
    }
  },
}
