import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachList from './pages/coaches/CoachList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';

import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsRecived from './pages/requests/RequestsRecived.vue';

import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';

import store from './store/index';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',

      redirect: '/coaches',
    },
    { path: '/coaches', name: '/coaches', component: CoachList },
    {
      name: 'coachDetail',
      props: true,
      path: '/coaches/:id',
      component: CoachDetail,
      children: [
        {
          path: 'contact',
          name: 'contact',
          component: ContactCoach,
          props: true,
        },
      ],
    },
    {
      path: '/register',
      name: 'register',
      component: CoachRegistration,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/requests',
      component: RequestsRecived,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/auth',
      component: UserAuth,
      props: true,
      meta: {
        requiresUnAuth: true,
      },
    },
    { path: '/:notFound(.*)', name: 'notFound', component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
