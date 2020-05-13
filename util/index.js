const { baseURL } = require('../config');
/**
 * @description 格式化时间
 * @param {object,number} time
 * @param {string} fmt YYYY-MM-DD hh:mm:ss
 * @returns 格式化后的时间
 */
function dateFormat(fmt, time = new Date()) {
  let res = '';
  // 1586875676681
  let date = typeof time === 'number' ? new Date(time) : time;
  let str = fmt;
  const obj = {
    Y: date.getFullYear().toString(), // 年
    M: (date.getMonth() + 1).toString(), // 月
    D: date.getDate().toString(), // 日
    h: date.getHours().toString(), // 时
    m: date.getMinutes().toString(), // 分
    s: date.getSeconds().toString(), // 秒
  };
  Object.keys(obj).forEach((key) => {
    if ({}.hasOwnProperty.call(obj, key)) {
      res = new RegExp(`(${key}+)`).exec(str);
      if (res) {
        str = str.replace(
          res[1],
          res[1].length === 1 ? obj[key] : obj[key].padStart(res[1].length, '0'),
        );
      }
    }
  });

  date = null;
  res = null;
  return str;
}

/**
 * @description 去除空白
 * @param {string,number} str
 * @returns 去除空白后的字符串
 */
function trimAll(str) {
  let param = str;
  param = typeof param === 'number' ? param.toString() : param;
  return param.replace(/\s*/g, '');
}

/**
 * @description 注册Api
 * @param {*} ApiArray api数组
 */
function registerApi(app, ApiArray) {
  // 循环对象
  const rLen = ApiArray.length;
  for (let i = 0; i < rLen; i += 1) {
    const ApiItem = ApiArray[i];
    const baseApi = baseURL + ApiItem.url;
    const { children } = ApiItem;
    // 循环子路由
    const cLen = children.length;
    for (let j = 0; j < cLen; j += 1) {
      const item = children[j];
      const method = item.method.toLocaleLowerCase() || 'get';
      const apiUrl = baseApi + item.url;
      if (method.indexOf(method) === -1) {
        throw new Error(`${apiUrl} ${method} ,register Api error`);
      }
      // 注册 兼容中间件 use
      if (item.url) app[method](apiUrl, item.fun);
      else app[method](item.fun);
      // 成功
      console.log(`${apiUrl} ${method} ,register Api success`);
    }
  }
}

module.exports = {
  dateFormat,
  trimAll,
  registerApi,
};
