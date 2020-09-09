import router from './router'//要使用同一个路由实例对象
// import cfg from '@/config'
import api from './api'
import cfg from './config'
import { LgetItem,LsetItem,LreItem } from './utils/storage'

//这里搞了一个路由的拦截处理
router.beforeEach((to, from, next) => {
    //这个东东目前还没用
    if (!cfg.webRouterIntercept) {//本地开发重定向
        cfg.localRedirect ? next({
            path: cfg.localRedirect,
            replace: true
        }) : next()
        return
    }
    const jwtToken = LgetItem('jwtToken')//string
    const site = JSON.parse(LgetItem('site'))//boolean
    //进入项目的时候，只要本地存在token，并且本地的site存在就执行，不管是true还是false
    if (jwtToken && site !== null) {
        //如果site为true，则已经选择了偏好，直接next跳转到我们手动去地址栏输入的路由地址，比如直接加入/home，
        //如果site为false,要去的路由地址不是要去设置偏好的地址。比如去/home，则indexOf等于-1,所以走else
        //如果去的是/preference，或者/preference/page1，或者/preference/page2,只要path中有/preference就可以next
        //即使跳过page1直接到page2也可以，最终会到/preference，也就是欢迎加入工蚁众服页面，点击完成的时候，如果第一步没选
        //可以直接点击跳转到第一步去
        if (site || to.path.indexOf('/preference') !== -1) {
            next()
        } else {//如果site为false，且去的路由地址不包含'/preference'，就跳到page1
        console.log('跳转到page1')
            // next({
            //     path: '/preference/page1',
            //     query: {
            //         site: false
            //     },
            //     replace: true
            // })
        }
    } else {
        if (to.query.code) {
            api('webLogin', {
                code: to.query.code,
                type: 1
            }).then(res => {
                //site:是否选择偏好，如果为false。就跳到选择偏好的页面
                const oauth2Query=LgetItem('oauth2Query')
                console.log(oauth2Query)
                // LreItem('oauth2Query')
                LsetItem('jwtToken', res.jwtToken)
                LsetItem('site', res.site)
                console.log(from)
                console.log(to)
                // next({
                //     path:to.query.state?decodeURIComponent(to.query.state):'/home',
                //     query:oauth2Query,
                //     replace:true
                // })
            })
        }else{
            const path=encodeURIComponent(to.path)//对路由进行编码
            console.log(path)
            console.log(to)
            LsetItem('oauth2Query',to.query)
            window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxecb7461cb5093dca&redirect_uri=${cfg.redirect}&response_type=code&scope=snsapi_userinfo&state=${path}#wechat_redirect`)
        }
    }
})


/*
token不存在
http://localhost:8080/dev/worker/ ==>http://localhost:8080/dev/worker/home
访问的是项目地址，相当于是一个html网页，然后又重新打开微信授权这个地址，那么之前项目网页就没得了，相当于打开了一个新的网站
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxecb7461cb5093dca&redirect_uri=${cfg.redirect}&response_type=code&scope=snsapi_userinfo&state=${path}#wechat_redirect
点击授权同意,微信授权这个网站重定向到我们指定的地址。又再一次打开我们的项目，此时地址栏会带上code和state参数
http://hswglist.jiaoyf.com/dev/worker/ ==>http://hswglist.jiaoyf.com/dev/worker/home/?code=031NLnll2FR2B54RnJol2lE38F3NLnlm&state=%2Fhome
http://hswglist.jiaoyf.com/dev/worker/home/?code=031NLnll2FR2B54RnJol2lE38F3NLnlm&state=%2Fhome ==>
http://hswglist.jiaoyf.com/dev/worker/home





*/

