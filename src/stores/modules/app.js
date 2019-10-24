import Axios from 'axios';
import api from '@/api/index';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    apps: '',
    app: '',
    collection: '',
    schemas: '',
    schema: '',
  },
  mutations: {
    SET_APPS(state, apps) {
      state.apps = apps;
    },
    SET_APP(state, app) {
      state.app = app;
    },
    SET_COLLECTION(state, collection) {
      state.collection = collection;
    },
    SET_SCHEMAS(state, schemas) {
      state.schemas = schemas;
    },
    SET_SCHEMA(state, schema) {
      state.schema = schema;
    }
  },
  actions: {
    async ACTION_FETCH_APPS({ commit }) {
      let result;
      try {
        result = await api.get('/parse/classes/App', {
          params: {
            keys: 'objectId, serverUrl, appid, javascriptKey'
          }
        })
      } catch (error) {
        return console.error(error);
      }
      const apps = result.data.results;
      commit('SET_APPS', apps);

      if (apps.length === 1) {
        const [instance] = apps;
        localStorage.setItem('CURRENT_APP', instance.objectId);
        const app = {
          api: Axios.create({
            baseURL: instance.serverUrl,
            headers: {
              'X-Parse-Application-Id': instance.appid,
              'X-Parse-JavaScript-Key': instance.javascriptKey,
            }
          }),
          app: instance
        };

        commit('SET_APP', app);
        return router.push('/');
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
      const app = {
        api: Axios.create({
          baseURL: instance.serverUrl,
          headers: {
            'X-Parse-Application-Id': instance.appid,
            'X-Parse-JavaScript-Key': instance.javascriptKey,
          }
        }),
        app: instance
      };
      commit('SET_APP', app);
    },

    async ACTION_FETCH_COLLECTION({ rootState, state, commit }, className) {
      let collection;

      if (state.collection && state.collection.className === className) {
        return state.collection;
      }
      if (!collection) {
        let result;
        try {
          result = await rootState.app.app.api.get(`/classes/${className}`)
        } catch (error) {
          return console.error(error);
        }
        collection = result.data;
      }

      if (collection && collection instanceof Object) {
        collection.className = className;
      }
      commit('SET_COLLECTION', collection);
      return collection;
    },

    async ACTION_FETCH_SCHEMAS({ rootState, commit, dispatch }) {
      if (!rootState.app.app) {
        await dispatch('app/ACTION_CHECK_APP', null, { root: true });
      }
      let result;
      try {
        result = await rootState.app.app.api.get('/schemas')
      } catch (error) {
        return console.error(error);
      }

      const schemas = {};
      result.data.results.forEach((item) => {
        schemas[item.className] = item;
      })
      return commit('SET_SCHEMAS', schemas);
    },
    async ACTION_FETCH_SCHEMA({ rootState, state, commit, dispatch }, className) {
      if (!rootState.app.app) {
        await dispatch('app/ACTION_CHECK_APP', null, { root: true });
      }
      let schema;
      if (state.schema && state.schema.className === className) {
        return state.schema;
      }
      if (state.schemas && state.schemas.className) {
        schema = state.schemas.className;
      }

      if (!schema) {
        let result;
        try {
          result = await rootState.app.app.api.get(`/schemas/${className}`)
        } catch (error) {
          return console.error(error);
        }
        schema = result.data;
      }

      commit('SET_SCHEMA', schema);
      return schema;
    },

    ACTION_CHECK_APP({ state, dispatch }) {
      if (state.app) {
        return;
      }

      const currentApp = localStorage.getItem('CURRENT_APP');
      if (currentApp) {
        return dispatch('ACTION_FETCH_APP', currentApp);
      }
      router.push('/404');
    },
  }
}
