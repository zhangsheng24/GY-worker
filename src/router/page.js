const Home=()=>import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
const Order=()=>import(/* webpackChunkName: "Order" */ '@/views/Order.vue')
const User=()=>import(/* webpackChunkName: "User" */ '@/views/User.vue')

//偏好
const Preference=()=>import(/* webpackChunkName: "Preference" */ '@/views/preference/index')
const PreferencePage1=()=>import(/* webpackChunkName: "Preference" */ '@/views/preference/page1')

const routes=[
    {   redirect:'/home',
        path:'/'
    },
    {
        path:'/home',
        component:Home,
        name:'Home',
        meta:{
            title:'首页',
            navIndex:1,
            touchNone:true,
            keepAlive:true
        }
    },
    {
        path:'/order',
        component:Order,
        name:'Order',
        meta:{
            title:'订单',
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
    },
    {
        path:'/preference',
        component:Preference,
        name:'Preference',
        meta:{
            title:'欢迎加入工蚁众服',
            navIndex:6
        }
    },
    {
        path:'/preference/page1',
        component:PreferencePage1,
        name:'PreferencePage1',
        meta:{
            title:'选择服务内容',
            navIndex:3
        }
    }
]

export default routes
