import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';

import store from '@/store';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'Home',
      meta: { auth: true },
      component: Home,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(m => m.meta.auth);
  const { currentUser } = firebase.auth();
  store.dispatch('SET_AUTHENTICATED', currentUser);

  if (store.state.authenticated && to.name !== 'Home') {
    next({ name: 'Home' });
  } else if (requiresAuth && !store.state.authenticated && to.name !== 'Login') {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
