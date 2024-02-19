import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

import CoachList from './pages/coaches/CoachList.vue';

import NotFound from './pages/NotFound.vue';

import store from './store/index';

const UserAuth = defineAsyncComponent(() => {
  import('./pages/auth/UserAuth.vue');
});

const CoachDetail = defineAsyncComponent(() =>
  import('./pages/coaches/CoachDetail.vue')
);
const CoachRegistration = defineAsyncComponent(() =>
  import('./pages/coaches/CoachRegistration.vue')
);

const ContactCoach = defineAsyncComponent(() => {
  import('./pages/requests/ContactCoach.vue');
});

const RequestsRecived = defineAsyncComponent(() =>
  import('./pages/requests/RequestsRecived.vue')
);

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
