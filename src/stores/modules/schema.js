import api from '@/api/index';

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
    async ACTION_FETCH_SCHEMAS({ commit }) {
      let result;
      try {
        result = await api.get('/parse/schemas')
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
    async ACTION_FETCH_SCHEMA({ state, commit }, className) {
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
          result = await api.get(`/parse/schemas/${className}`)
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
