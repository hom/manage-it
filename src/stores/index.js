
import Vue from 'vue';
import Vuex from 'vuex';
import me from '@/stores/me';

Vue.use(Vuex);

const modules = {
  me,
}
export default new Vuex.Store({
  modules,
});
