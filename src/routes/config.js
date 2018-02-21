import MainLayout from 'views/layouts/MainLayout';
import EmptyLayout from 'views/layouts/EmptyLayout';
import LoginView from 'views/Login';
import HomeView from 'views/Home';
import ShoppingView from 'views/Shopping';
import CheckoutView from 'views/Checkout';

const routes = [
  {
    path: '/',
    exact: true,
    layout: MainLayout,
    title: 'Home Page',
    loginRequired: true,
    component: HomeView
  },
  {
    path: '/shopping',
    exact: true,
    layout: MainLayout,
    title: 'Shopping Page',
    loginRequired: true,
    component: ShoppingView
  },
  {
    path: '/checkout',
    exact: true,
    layout: MainLayout,
    title: 'Checkout Page',
    loginRequired: true,
    component: CheckoutView
  },
  {
    path: '/signin',
    layout: EmptyLayout,
    title: 'Sign In',
    component: LoginView
  }
];

export default routes;
