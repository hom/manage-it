
import Vue from 'vue';
import Vuex from 'vuex';
import me from '@/stores/modules/me';
import app from '@/stores/modules/app';
import nav from '@/stores/modules/nav';
import schema from '@/stores/modules/schema';
import collection from '@/stores/modules/collection';

Vue.use(Vuex);

const modules = {
  me,
  app,
  nav,
  schema,
  collection,
}
export default new Vuex.Store({
  modules,
});
