# client-worker

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 1.同一台主机全局设置了一个git账号，如设置了在公司的gitlab账号和邮箱和密码，但是在工作之余，我还需要学习，想把自己的学习记录总结提交到自己的github上？
第一步：去登录自己的github账号，创建一个仓库。
第二步：本地创建一个项目，在根目录下鼠标右键，git bash here，安装了git之后就会出现这个。
第三步：根据github上创建仓库之后的提示，一步步操作
    1.git init 初始化一个.git文件
    2.git add . 将根目录下的所有文件添加到暂存区
    3.git commit -m 'first' 提交到git仓库
    4.git remote add origin https://github.com/zhangsheng24/test111.git 本地git仓库关联远程的github仓库
    5.git push -u origin master 将git仓库的代码推送到远程仓库，这一步需要输入远程仓库的用户名和密码
最终我们的代码都提交到了远程仓库去了。
这个时候我们查看凭据管理器  路径：控制面板\用户帐户和家庭安全\凭据管理器
会发现其实之前是有一个gitlab的凭据的，现在又多了一个github的凭据
