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
        const [instance] = apps;
        console.log('TCL: ACTION_FETCH_APPS -> instance', instance);
        localStorage.setItem('CURRENT_APP', instance.objectId);
        const app = {
          api: Axios.create({
            baseURL: instance.serverUrl,
            headers: {
              'X-Parse-Application-Id': instance.appid,
              'X-Parse-JavaScript-Key': instance.javascriptKey,
              'X-Parse-Master-Key': instance.masterKey
            }
          }),
          app: instance
        };

        commit('SET_APP', app);
        router.push('/');
      }
      return apps;
    },

    async ACTION_FETCH_APP({ commit }, objectId) {
      let result;
      try {
        result = await api.get(`/parse/classes/App/${objectId}`);
      } catch (error) {
        console.error(error);
      }

      const instance = result.data;
      console.log(instance);
      const app = {
        api: Axios.create({
          baseURL: instance.serverUrl,
          headers: {
            'X-Parse-Application-Id': instance.appid,
            'X-Parse-JavaScript-Key': instance.javascriptKey,
            'X-Parse-Master-Key': instance.masterKey
          }
        }),
        app: instance
      };
      console.log(app);
      commit('SET_APP', app);
    },

    ACTION_CHECK_APP({ state, dispatch }) {
      if (state.app) {
        return;
      }

      const currentApp = localStorage.getItem('CURRENT_APP');
      console.log(currentApp);
      if (currentApp) {
        return dispatch('ACTION_FETCH_APP', currentApp);
      }
      router.push('/404');
    },
  }
}
