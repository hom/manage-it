import { Message } from 'element-ui';
import router from '@/router';

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

      Message.success('登陆成功');
      setTimeout(() => {
        router.push('/apps');
      }, 1000)
    },
    ACTION_LOGOUT({ commit }) {
      localStorage.removeItem('CURRENT_USER')
      commit('SET_ME', '');

      Message.success('退出登录');
      setTimeout(() => {
        router.push('/login');
      }, 1000)
    },
  }
}
