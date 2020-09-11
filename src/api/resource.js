export default{
    //登录
    webLogin:{
        method:'post',
        url:'/user/web/login'
    },
    //微信配置接口
    getWxSign: {
        method: 'get',
        url: '/hs/config'
      },
    //工人偏好
    preference:{
        //工人偏好分类api
        treeList:{
            method:'post',
            url:'/workerItem/treeList'
        }
    }
}