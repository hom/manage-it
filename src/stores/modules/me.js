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
    ACTION_CHECK_LOGIN({ state }) {
      if (!state.me && !localStorage.getItem('CURRENT_USER')) {
        return router.push('/login');
      }
      return state.me;
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
      console.log(user);
      commit('SET_ME', user);
      localStorage.setItem('CURRENT_USER', JSON.stringify(user));

      Message.success('登陆成功');
      setTimeout(() => {
        router.push('/apps');
      }, 1000)
      return user;
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
