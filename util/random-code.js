const svgCaptcha = require('svg-captcha');


/**
 * @description 生成 str code img
 * @param {number} width
 * @param {number} height
 * @returns
 */
function strCode(width = 200, height = 80, size = 4) {
  return svgCaptcha.create({
    size,
    fontSize: 92,
    ignoreChars: '0o1i',
    noise: 2,
    color: true,
    background: '#ffffff',
    width,
    height,
  });
}

/**
 * @description 生成算数 code img
 * @param {number} width
 * @param {number} height
 * @returns
 */
function mathCode(width = 200, height = 80) {
  return svgCaptcha.createMathExpr(
    {
      noise: 2,
      fontSize: 92,
      color: true,
      background: '#ffffff',
      mathMin: 0,
      mathMax: 25,
      mathOperator: '+/-',
      width,
      height,
    },
  );
}


module.exports = {
  strCode,
  mathCode,
};
