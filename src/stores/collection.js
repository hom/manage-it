import axios from 'axios';

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

      if (!collection) {
        let result;
        try {
          result = await axios.get(`https://manage.pongj.com/parse/classes/${className}`, {
            headers: {
              'X-Parse-Application-Id': '2862a6800343b0d62411b950c1d9ed81',
              'X-Parse-Master-Key': 'a2fcb171fb635f17f522c262de526a6e'
            }
          })
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
