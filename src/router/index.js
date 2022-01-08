import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: ()=> import('../components/Login'),
    },
    {
      path: '/Home',
      name: 'Home',
      component: ()=> import('../views/Home'),
      children:[
        {path:'/Heard',name:'Heard',component:()=> import('../views/Heard')},
        {path:'/Side',name:'Side',component:()=> import('../views/Side')},
        {path:'/HomePage',name:'HomePage',component:()=> import('../views/HomePage')},
        {path:'/UserManage',name:'UserManage',component:()=> import('../views/UserManage')},
        {path:'/SingerManage',name:'SingerManage',component:()=> import('../views/SingerManage')},
        {path:'/SongListManage',name:'SongListManage',component:()=> import('../views/SongListManage')},
      ]
    }
  ]
})
