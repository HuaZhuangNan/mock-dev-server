# 一些说明,后端 ts 不会又图简单所以使用自己封装的 devServer-Mock

## 前言

1. 建立这个模板的初衷一开始是为了方便自己调试一些简单 api 业务的测试
2. 不直接写一个服务器是因为，服务器有很多东西，而我的业务不需要那么多，能简单就简单吧
3. 这个是直接使用的 webpack 的 devServer 的，所以当前只使用在 webpack 打包工具项目中

## 实现功能

[X] Api的请求响应Mock数据，固定数据
[X] 日志
[X] 登录
[X] 注册

## 已知问题

1. 使用：Mock.Random.dataImage('100x100', code) 生成 base64 图片
   - 报错： module.require('canvas') not found
   - 使用解决方案[https://github.com/nuysoft/Mock/issues/380](https://github.com/nuysoft/Mock/issues/380) 无效果(技术较差，还未找到解决办法)

## 投入 webpack 项目使用

1. 打开项目控制台拷贝本项目到项目根目录下: `git clone http://`

2. **webpack 项目**中安装 Mockjs 开发依赖 `npm install mockjs -D 或 yarn add mockjs -D`

   - [Mockjs 官网](http://mockjs.com/)
   - [Mockjs-GitHub](https://github.com/nuysoft/Mock)

3. 配置 webpack 文件

    ```js
        // 添加这些，是不是超简单
        const serverPath = 'mock-dev-server-js-template'  // 文件夹名
        devServer: {
            ...
            before: require(`./${serverPath}/server.js`)
        },
    ```

4. 写 api 请求

    ```js
      // 1. 打开 api 文件夹
      // 2. 新建一个js文件
      // 3. 引入db的数据
      // 4. 编写逻辑
      // 5. index.js 导出
    ```

## 目录说明

```js
|-- .editorconfig   // 编辑器规范
|-- .eslintrc.js    // 代码规范
|-- .gitignore      // 不上传文件
|-- config.js       // 配置文件
|-- package.json    // 包文件
|-- server.js       // 服务启动文件
|-- api             //  api 接口
|   |-- index.js    // index 根路径接口
|   |-- users.json  // 模拟用户数据
|-- util            // 工具有关文件夹
    |-- index.js    // 首页
    |-- random-code.js // 返回svg随机验证码
    |-- res-body.js    // 返回规范文件夹
```

## api 规范编写说明

```js
  {
    url: '', // 基础 url ,注意后面不要加 /， 空表示后面都是根路径
    children: [   // 子链接请求
      {
        /*
         * 请求方法 get | post | put | delete | all | use
         * 不分大小写, 不添默认 get () 对应 express 的 app.get
         * 写错会抛出异常
         * 解析过程详见 utils/index.js
        */
        'method': 'get',
        'path': '/code-img', //  基于基础 url, 解析为 baseURL/app/code-img
        'fun': (req,res)=>{}, // Login(req,res) 方法
      }
    ]
  }
  // 上面会应用于  app.get([baseURL]+'/code-img',(req,res){})
```

## 调用简单日志: 见 log.js

## License

[MIT](./LICENSE) © HuaZhuangNan(花妆男)
