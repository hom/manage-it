// import api from '@/api/index';

export default {
  namespaced: true,
  state: {
    collection: '',
  },
  mutations: {
    SET_COLLECTION(state, collection) {
      state.collection = collection;
    }
  },
  actions: {
    async ACTION_FETCH_COLLECTION({ state, commit }, className) {
      let collection;

      if (state.collection && state.collection.className === className) {
        return state.collection;
      }
      console.log(state);
      if (!collection) {
        let result;
        try {
          result = await state.app.app.api.get(`/classes/${className}`)
        } catch (error) {
          return console.error(error);
        }
        collection = result.data;
      }

      if (collection && collection instanceof Object) {
        collection.className = className;
      }
      console.log(collection);
      commit('SET_COLLECTION', collection);
      return collection;
    }
  }
}
