import { Message } from 'element-ui';
import router from '@/router';
import api from '@/api';

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
    ACTION_CHECK_LOGIN({ commit, state }) {
      if (state.me) {
        return;
      }

      if (localStorage.getItem('CURRENT_USER')) {
        const me = JSON.parse(localStorage.getItem('CURRENT_USER'));
        commit('SET_ME', me);
        return me;
      }
      return router.push('/login');
    },
    async ACTION_LOGIN({ commit }, form) {
      let result;
      try {
        result = await api.get('/parse/login', {
          params: form,
        });
      } catch (error) {
        console.error(error.response);
        return Message.error('登录失败');
      }
      const user = result.data;
      commit('SET_ME', user);
      localStorage.setItem('CURRENT_USER', JSON.stringify(user));

      Message.success('登陆成功');
      setTimeout(() => {
        router.push('/apps');
      }, 1000)
      return user;
    },
    ACTION_LOGOUT({ commit }) {
      localStorage.removeItem('CURRENT_USER');
      commit('SET_ME', '');

      localStorage.removeItem('CURRENT_APP');

      Message.success('退出登录');
      setTimeout(() => {
        router.push('/login');
      }, 1000)
    },
  }
}
