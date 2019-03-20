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
    ACTION_LOGIN({ commit }, form) {
      commit('SET_ME', form);
      setTimeout(() => {
        router.push('/');
      }, 1000)
    },
    ACTION_LOGOUT({ commit }) {
      commit('SET_ME', '');
      setTimeout(() => {
        router.push('/login');
      }, 1000)
    }
  }
}
