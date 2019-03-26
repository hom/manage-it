import axios from 'axios';

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
        result = await axios.get('https://portal.pongj.com/parse/schemas', {
          headers: {
            'X-Parse-Application-Id': '2862a6800343b0d62411b950c1d9ed81',
            'X-Parse-Master-Key': 'a2fcb171fb635f17f522c262de526a6e'
          }
        })
      } catch (error) {
        return console.error(error);
      }

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
          result = await axios.get(`https://portal.pongj.com/parse/schemas/${className}`, {
            headers: {
              'X-Parse-Application-Id': '2862a6800343b0d62411b950c1d9ed81',
              'X-Parse-Master-Key': 'a2fcb171fb635f17f522c262de526a6e'
            }
          })
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
