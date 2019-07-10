
import Vue from 'vue';
import Vuex from 'vuex';
import me from '@/stores/modules/me';
import app from '@/stores/modules/app';
import nav from '@/stores/modules/nav';

Vue.use(Vuex);

const modules = {
  me,
  app,
  nav,
}
export default new Vuex.Store({
  modules,
});
