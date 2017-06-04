import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '@/components/Hello';
import Seller from '@/components/seller/seller.vue';
import Goods from '@/components/goods/goods.vue';
import Rating from '@/components/rating/rating.vue';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Hello',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Rating
    }
  ]
});
