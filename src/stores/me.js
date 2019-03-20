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
      })
    },
  }
}
