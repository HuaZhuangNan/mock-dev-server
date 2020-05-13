const path = require('path');
const pack = require('../package.json');

module.exports = {
  global: { // 全局数据渲染到所有页面
    name: pack.name || 'mock-dev-server',
    lang: 'zh-CN',
    version: pack.version || '0.1.0',
    author: pack.author ? pack.author.name : 'no set author name',
    createTime: 1587817533131,
    year: new Date().getUTCFullYear(),
    record: '备案号。。。。。。',
  },
  baseURL: '/api',
  methods: ['get', 'post', 'put', 'delete', 'all', 'use'], // 请求api方法数组
  log: {
    size: '10M',
    compress: 'gzip',
    interval: '1d',
    path: path.join(__dirname, 'logs'),
  },
  cacheTime: '1d',
  cookieTime: 1 * 24 * 60 * 60 * 1000, // 1d
  proxy: '127.0.0.1',
  corsConfig: {
    origin: process.env.NODE_ENV === 'development' ? true : ['http://127.0.0.1', 'https://127.0.0.1'], // 这是本地的默认地址和端口，vue启动的项目就是在这里，这样保证了等会我们在浏览器能访问服务器的数据（user.json）
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    maxAge: 3600,
  },
};
