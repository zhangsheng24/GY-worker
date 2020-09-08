module.exports = {
    plugins: {
        autoprefixer: {//配置升级的版本号
            overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8'],
        },
        'postcss-pxtorem': {
            rootValue: 37.5,//设置px转换成rem的基准值，为了方便，ui尺寸是375，我们就设置成375，如果是750，就设置成75，但是我们公司给的750，项目配的是37.5，所以在写尺寸的时候ui上所有的都需要/2.
            propList: ['*'],
        },
    },
};