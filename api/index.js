const fs = require('fs');
const path = require('path');

// const mock = require('mockjs');
const uuid = require('node-uuid');

const resBody = require('../util/res-body');
const { strCode } = require('../util/random-code');
const users = require('./users.json'); // 用来模拟用户

// const { Random } = mock;

/**
 * @description 图片验证码
 */
function codeImg(req, res) {
  const code = strCode();
  req.session.code = 'test';// code.text
  res.status(200).send(code.data); // 重定向到图片链接
}


/**
 * @description 登录
 * @param {*} req
 * @param {*} res
 * @returns
 */
function Login(req, res) {
  const {
    name, email, pass, code,
  } = req.body;
  console.log(req.hostname);
  console.log('Login: ', req.body);
  const sessionCode = req.session.code;
  delete req.session.code; // 删除code
  if (code !== sessionCode) {
    return res.status(200).send(resBody(401, 'code error'));
  }
  // 验证登录
  if (users.some((obj) => ((obj.name === name || obj.email === email) && obj.pass === pass))) {
    const token = uuid.v4();
    // 设置session
    req.session.token = token;
    // 返回cookies
    return res.status(200).send(resBody(200, token));
  }
  res.status(200).send(resBody(401, 'name or pass error'));
}

/**
 * @description 注册
 * @param {*} req
 * @param {*} res
 * @returns
 */
function Register(req, res, next) {
  const {
    name, email, pass, code,
  } = req.body;
  console.log('Register: ', req.body);
  const sessionCode = req.session.code;
  delete req.session.code; // 删除 code
  if (code !== sessionCode) {
    return res.status(200).send(resBody(401, 'code error'));
  }
  if (name.length >= 5 && email && email.indexOf('@') !== -1 && pass.length >= 5) {
    if (users.some((obj) => (obj.name === name || obj.email === email))) {
      return res.status(200).send(resBody(401, 'user already exists'));
    }
    users.push({ name, email, pass });
    try {
      fs.writeFileSync(path.join(__dirname, '/users.json'), JSON.stringify(users));
    } catch (error) {
      next(error);
    }
    const token = uuid.v4();
    // 设置session
    req.session.token = token;
    // 返回cookies
    return res.status(200).send(resBody(200, token));
  }
  res.status(200).send(resBody(401, 'info error'));
}

module.exports = {
  url: '', // 为空就是基于根目录
  children: [
    {
      method: 'get',
      url: '/code-img',
      fun: codeImg,
    },
    {
      method: 'post',
      url: '/login',
      fun: Login,
    },
    {
      method: 'post',
      url: '/register',
      fun: Register,
    },
  ],
};
