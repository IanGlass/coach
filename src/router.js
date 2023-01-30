import { createRouter, createWebHistory } from 'vue-router';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index';

const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const CoachesList = () => import('./pages/coaches/CoachesList.vue');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const RequestReceived = () => import('./pages/requests/RequestReceived.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      component: CoachesList
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [

        {
          path: 'contact',
          component: ContactCoach
        }
      ]
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/requests',
      component: RequestReceived,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: {
        requiresUnAuth: true
      }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    return next('/auth');
  }
  if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    return next('/coaches');
  }
  return next();
});

export default router;
