import axios from 'axios'
//在main.js中引入了vant，所以在任何组件中都可以使用，但是网络请求跟main.js没得任何关系，要用就得引入，可以按需引入
import { Notify } from 'vant'
import cfg from '@/config'
import { LgetItem } from './storage'

// axios使用post发送数据时，默认是直接把json放到请求体中提交到后端，也就是说Content-type是application/json;charset=utf-8
//这是axios默认的请求头content-type类型。但是content-type常见有3种，传参的形式就不一样了。

//1.Content-Type: application/json ： 请求体中的数据会以json字符串的形式发送到后端
//2.Content-Type: application/x-www-form-urlencoded：请求体中的数据会以普通表单形式（键值对）发送到后端
//3.Content-Type: multipart/form-data： 它会将请求体的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件
//详细的解释看：https://www.cnblogs.com/dreamcc/p/10752604.html
axios.defaults.baseURL = `${cfg.host}${cfg.port}${cfg.baseUrl}`
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.timeout = 20000

axios.defaults.wiCredentials = true
//跨域请求是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等)
//也可以简单的理解为，当前请求为跨域类型时是否在请求中协带cookie。

axios.interceptors.request.use(
    config => {
        LgetItem('jwtToken') && (config.headers['jwtToken']=LgetItem('jwtToken'))
        return config
    }

)

axios.interceptors.response.use(
    res => {
        if(res.data && res.data.data){
            return res.data.data
        }else{
            if(res.data.code === 4030){
                console.log('jwtToken失效')
                Notify({type:'warning',message:'登录失效，重新登录中'})
                if(cfg.isLogining){
                    cfg.isLogining=false
                    window.location.reload()
                }
            }else{
                Notify({type:'danger',message:res.data.message})
            }
        }
        return Promise.reject(res.data)
    },err=>{
        console.log(err.response)
        let message='请求出错，请稍后重试！'
        if(err.message.includes('timeout')){
            message='请求超时'
        }else{
            if(err.response){
                message=err.response.data.message
                switch(err.response.status){
                    case 404:
                        message='Not Found'
                        break;
                    case 400:
                        message=err.response.data.error
                        break
                }
            }
        }
        Notify({type:'danger',message:message})
        return Promise.reject(err && err.response? err.response.data : {message})
    }
)

export default function (options) {
    let params = {
        method: options.method,
        url: options.url,
        data: options.params,
        ...options.other
    }
    if(params.method.toLowerCase() === 'get'){
        params.params=params.data
        delete params.data
    }
    return axios(params)
}