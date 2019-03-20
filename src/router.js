import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    { path: '/', name: 'home', meta: { title: '首页' }, component: Home,
      children: [
        { path: 'schema', component: () => import('./components/schema.vue'), },
      ]
    },
    { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ './views/About.vue'), },
    { path: '/login', name: 'login', meta: { title: '登录' }, component: () => import(/* webpackChunkName: "about" */ './views/Login.vue') },
  ],
});


router.beforeEach((to, from, next) => {
  // 如果设置标题，拦截后设置标题
  if (to.meta.title) {
    // eslint-disable-next-line
    document.title = to.meta.title + ' - Manage it';
  }
  next()
})

export default router;
