import router from '../router';

export default {
  namespaced: true,
  state: {
    me: ''
  },
  mutations: {
    SET_ME(state, me) {
      state.me = me;
    },
  },
  actions: {
    ACTION_CHECK_LOGIN({ state }) {
      if (!state.me && !localStorage.getItem('CURRENT_USER')) {
        return router.push('/login');
      }
      return state.me;
    },
    ACTION_LOGIN({ commit }, form) {
      commit('SET_ME', form);
      localStorage.setItem('CURRENT_USER', JSON.stringify(form));

      setTimeout(() => {
        router.push('/');
      }, 1000)
    },
    ACTION_LOGOUT({ commit }) {
      localStorage.removeItem('CURRENT_USER')
      commit('SET_ME', '');
      setTimeout(() => {
        router.push('/login');
      }, 1000)
    },
  }
}
