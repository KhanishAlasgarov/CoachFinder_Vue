import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachList from './pages/coaches/CoachList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';

import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsRecived from './pages/requests/RequestsRecived.vue';

import NotFound from './pages/NotFound.vue';

export default createRouter({
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
    { path: '/register', name: 'register', component: CoachRegistration },
    { path: '/requests', component: RequestsRecived },
    { path: '/:notFound(.*)', name: 'notFound', component: NotFound },
  ],
});
