
import Vue from 'vue';
import Vuex from 'vuex';
import me from '@/stores/me';
import nav from '@/stores/nav';
import schema from '@/stores/schema';
import collection from '@/stores/collection';

Vue.use(Vuex);

const modules = {
  me,
  nav,
  schema,
  collection,
}
export default new Vuex.Store({
  modules,
});
