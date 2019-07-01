// import api from '@/api/index';

export default {
  namespaced: true,
  state: {
    schemas: '',
    schema: '',
  },
  mutations: {
    SET_SCHEMAS(state, schemas) {
      state.schemas = schemas;
    },
    SET_SCHEMA(state, schema) {
      state.schema = schema;
    }
  },
  actions: {
    async ACTION_FETCH_SCHEMAS({ rootState, commit, dispatch }) {
      console.log(rootState);
      if (!rootState.app.app) {
        await dispatch('app/ACTION_CHECK_APP', null, { root: true });
      }
      let result;
      try {
        result = await rootState.app.app.api.get('/schemas')
      } catch (error) {
        return console.error(error);
      }

      console.log(result.data);
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
      console.log(schema);
      return schema;
    }
  }
}
