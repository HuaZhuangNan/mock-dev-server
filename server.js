const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const appConfig = require('./config');
const Index = require('./api/index');
const { registerApi } = require('./util/index');
const resBody = require('./util/res-body');

// 注册路由
const apiList =  [
  Index,
];
/**
 * @description webpack-dev-server before
 * @param {*} app
 */
function mockServer(app) {
  // 信任代理
  app.set('trust proxy', (ip) => {
    if (appConfig.proxy && ip === appConfig.proxy) return true;
    return false;
  });
  // 设置响应头
  app.set('x-powered-by', appConfig.global.name);
  // 解决跨域
  app.use(cors(appConfig.corsConfig));
  // 压缩响应
  app.use(compression({
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  }));
  // 写日志
  app.use(morgan('dev'));
  // 解析处理请求
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  // session 设置
  app.use(session({
    secret: appConfig.global.version, // 版本变了签名也变了
    resave: false,
    saveUninitialized: true,
    key: '_u_',
    cookie: { maxAge: appConfig.cookieTime, secure: true },
  }));
  // 注册 api
  registerApi(app, apiList);
  // 处理 404
  app.use((req, res) => {
    res.status(200).json(resBody(404));
  });
  // 测试
  app.get(`${appConfig.baseURL}/test`, (req, res) => {
    res.status(200).end('OK');
  });
}

module.exports = mockServer;
