const Home=()=>import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
const User=()=>import(/* webpackChunkName: "User" */ '@/views/User.vue')

const routes=[
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home,
        name:'Home',
        meta:{
            title:'首页',
            navIndex:1,
            touchNone:true
        }
    },
    {
        path:'/user',
        component:User,
        name:'User',
        meta:{
            title:'我的',
            navIndex:1,
            touchNone:true
        }
    }
]

export default routes
