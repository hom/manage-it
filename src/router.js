import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import Layout from './layouts/index.vue';

NProgress.configure({ showSpinner: false });

Vue.use(Router);

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    { path: '/', name: 'home', redirect: '/dashboard', meta: { title: '首页' }, component: Layout,
      children: [
        { path: '/schema/:className', component: () => import('./components/schema.vue'), },
        { path: '/database/:className', component: () => import('./components/database.vue'), },
        { path: '/dashboard', meta: { title: '图形总览' }, component: () => import('./views/dashboard/index.vue'), },
        { path: '/dashboard/database', meta: { title: '数据库' }, component: () => import('./views/dashboard/database.vue'), },
        { path: '/dashboard/report', meta: { title: '报表' }, component: () => import('./views/dashboard/report.vue'), },
        { path: '/401', component: () => import('./views/error/401.vue'), },
        { path: '/404', component: () => import('./views/error/404.vue'), },
      ]
    },
    { path: '/apps', meta: { title: 'Apps' }, component: () => import('./views/apps/index.vue'), },
    { path: '/login', name: 'login', meta: { title: '登录' }, component: () => import(/* webpackChunkName: "login" */ './views/login/index.vue') },
    { path: '*', component: () => import('./views/error/404.vue'), },
  ],
});

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // 如果设置标题，拦截后设置标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - Manage it`;
  }

  if (localStorage.getItem('CURRENT_APP')) {
    console.log('router check pass');
  }

  const user = localStorage.getItem('CURRENT_USER');
  if (user) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
    } else {
      // if is logged in, redirect to the home page
      next();
    }
    NProgress.done();
  } else {
    if (whiteList.indexOf(to.path) === -1) {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    } else {
      next();
    }
    NProgress.done();
  }
})

export default router;
