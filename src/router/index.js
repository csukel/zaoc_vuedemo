import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/Homepage';
import Login from '@/components/Login';
import ChargePatient from '@/components/ChargePatient';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/homepage',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/chargepatient/:falnr',
      name: 'ChargePatient',
      component: ChargePatient,
      props: true
    }
  ]
})
