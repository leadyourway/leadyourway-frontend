import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PaymenthMethodView from '../views/PaymenthMethodView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import SearchView from '../views/SearchView.vue';
import ProfileView from '../views/ProfileView.vue';
import ProductPurchaseView from '../views/ProductPurchaseView.vue';
import AddBikeView from '../views/AddBikeView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import UpdateProfileView from '../views/UpdateProfileView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/profile/update',
      component: UpdateProfileView,
    },
    {
      path: '/rent',
      name: 'rent',
      component: ProductPurchaseView,
    },
    {
      path: '/create',
      name: 'add-bike',
      component: AddBikeView,
    },
    {
      path: '/payment-method',
      name: 'payment-method',
      component: PaymenthMethodView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
