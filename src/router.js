import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/dashboard/index.vue';
import Layout from './layouts/index.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    { path: '/', name: 'home', redirect: '/dashboard', meta: { title: '首页' }, component: Layout,
      children: [
        { path: '/schema/:className', component: () => import('./components/schema.vue'), },
        { path: '/database/:className', component: () => import('./components/database.vue'), },
        { path: '/dashboard', component: () => import('./views/dashboard/index.vue'), },
      ]
    },
    { path: '/apps', meta: { title: 'Apps' }, component: () => import('./views/apps/index.vue'), },
    { path: '/login', name: 'login', meta: { title: '登录' }, component: () => import(/* webpackChunkName: "login" */ './views/login/index.vue') },
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
