const TerserPlugin=require('terser-webpack-plugin')//移除项目中所有console的插件
const CompressionWebpackPlugin=require('compression-webpack-plugin')//项目采用gzip打包的插件

const buildcfg={
    title:'工蚁众服test',
    port:8080,//本地项目跑的端口号
    outputDir:'worker',//项目打包输出的文件名
    env:process.env.VUE_APP_TITLE,//自定义的环境变量，全局的
    publicPath:process.env.BASE_URL,//打包后文件链接，说白了就是端口号后面又搞了/dev/worker/，目的是多个项目跑在一个服务器里面，为了作区分，不同项目放在服务器中的不同文件夹中
    productionGzip:true,//是否启用Gzip打包
    productionGzipExtensions:['js','css'],//指定哪些文件需要通过gzip压缩
    closeConsole:false,//是否移除console
    sourcemapUpload:false,//是否上传sourcemap到sentry
    cdnFlag:false,//是否启用cdn加载，采用cdn加载第三方框架，可以有效的减少包的体积
    externals:{//key:依赖包的名字，value:依赖包导出的名字
        'vue':'Vue',
        'vue-router':'VueRouter',
        'vuex':'Vuex',
        'axios':'axios'
    }
}
const cdn={
    dev:{
        css:[],
        js:[]
    },
    prod:{
        css:[],
        js:[]
    }
}
console.log(`环境变量：${buildcfg.env},
打包后文件baseURL：${buildcfg.publicPath},
是否启用gzip压缩：${buildcfg.productionGzip},
是否移除console：${buildcfg.closeConsole},
是否启用cdn加载：${buildcfg.cdnFlag}`)

module.exports={
    publicPath:buildcfg.publicPath,
    outputDir:buildcfg.outputDir,
    // 是否在开发环境下通过eslint-loader在每次保存代码时lint检测代码
    //设置成true或者waringeslint-loader会将lint错误输出为编译警告，不会使得编译失败
    lintOnSave:true,
    //productionSourceMap设置成false，打包之后就不会生成map文件，map文件的作用在于：
    //项目打包之后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错
    //也就是说map文件相当于是查看源码的一个东西，如果不需要定位问题，并且不想被看到源码，就设置成false,
    //既可以减少包的大小，还可以加密源码。
    productionSourceMap:buildcfg.sourcemapUpload,
}