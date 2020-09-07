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

### 1.关于同一个主机添加多个git账号的问题如何解决？
在公司使用的仓库是内部的gitlab，但是个人的是github，有时候可能需要自己玩玩，本机git设置的是gitlab的账号邮箱和密码，如果在创建一个项目要提交到自己的github仓库中就会报错，
因为我们本机全局设置的git账号和邮箱是公司的gitlab，使用这个账号是无法去关联我自身的github上的仓库的。
