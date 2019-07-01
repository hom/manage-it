import Axios from 'axios';
import api from '@/api/index';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    apps: '',
    app: '',
  },
  mutations: {
    SET_APPS(state, apps) {
      state.apps = apps;
    },
    SET_APP(state, app) {
      state.app = app;
    }
  },
  actions: {
    async ACTION_FETCH_APPS({ commit }) {
      let result;
      try {
        result = await api.get('/parse/classes/App')
      } catch (error) {
        return console.error(error);
      }
      const apps = result.data.results;
      commit('SET_APPS', apps);

      if (apps.length === 1) {
        const app = {
          api: Axios.create({
            baseURL: process.env.VUE_APP_BASE_URL,
            headers: {
              'X-Parse-Application-Id': process.env.VUE_APP_PARSE_APPID,
              'X-Parse-JavaScript-Key': process.env.VUE_APP_PARSE_JAVASCRIPT_KEY,
              'X-Parse-Master-Key': process.env.VUE_APP_PARSE_MASTER_KEY
            }
          }),
          app: apps[0]
        };

        commit('SET_APP', app);
        router.push('/');
      }
      return apps;
    }
  }
}
