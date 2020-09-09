//配置编译环境和线上环境之间的切换
const env=process.env

let config={
    host:'',//接口地址
    port:'',
    baseUrl:'',
    webRouterIntercept:true,//登录拦截
    type:env.VUE_APP_TITLE,
    phone:'400-677-2378',
    redirect:'http://hswglist.jiaoyf.com/dev/worker/',//项目所属的服务器地址
    isLogining:true,
    localRedirect:'',
    version:env.VUE_APP_VERSION,//版本号
    routerBase:env.BASE_URL,//vueRouter的base，同nginx配置
}

if(config.type==='development'){
    config.port=':8089'
    config.host='http://192.168.148.190'
}else if(config.type === 'production'){
    config.baseUrl='/api'
    config.host='https://hswglist.jiaoyf.com'
    config.redirect='https://hswglist.jiaoyf.com/worker'
}else if(config.type ==='test'){
    config.baseUrl='/api'
    config.host='https://hskj.jiaoyf.com'
    config.redirect='https://hswglist.jiaoyf.com/test/worker'
}
export default config