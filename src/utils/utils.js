/* @description 正则验证
 * @param {String} val 要验证的值
 * @param {String} type 要验证的类型
 * [type可能的值为：notEmpty值不为空、phone手机号、sixFigures六位数字]
 * 根据需求继续扩展
 **/
export const u_Reg = (val, type) => {
  switch (type) {
    // 值不为空
    case 'notEmpty':
      return val && val.length > 0 && !/^\s/.test(val);
      break;
      // 验证手机号
    case 'phone':
      return /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/.test(val);
      break;
      // 六位数字  
    case 'sixFigures':
      return /^\d{6}$/.test(val);
      break;
      // 身份证  
    case 'idcard':
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val);
      break;
      // 姓名  
    case 'name':
      return /^[\u4e00-\u9fa5]{2,4}$/.test(val);
      break;
    default:
      alert('函数type参数不匹配');
      break;
  }
}

/* @description 格式化剩余时间
 * @param {String} endTime 结束日期
 * @return {Object} d:剩余天数、h:小时数、m:分钟数、s:秒数
 **/
export const u_formatRemainTime = (endTime, callback) => {
  const startDate = new Date(), //开始时间
    endDate = new Date(endTime), //结束时间
    t = endDate.getTime() - startDate.getTime(); //时间差
  let d = 0,
    h = 0,
    m = 0,
    s = 0;
  if (t <= 0) {
    callback && typeof callback === 'function' && callback();
  } else {
    d = formatNumber(Math.floor(t / 1000 / 60 / 60 / 24));
    h = formatNumber(Math.floor(t / 1000 / 60 / 60 % 24));
    m = formatNumber(Math.floor(t / 1000 / 60 % 60));
    s = formatNumber(Math.floor(t / 1000 % 60));
  }
  return {
    d,
    h,
    m,
    s
  }
}

/* @description 时间戳转换
 * @param {String} time 要转换的时间戳
 * @param {String} conf 配置参数
 * @return {Object} "all"返回年月日时分秒，"ymd"返回年月日，"ymdhm"返回年月日时分
 **/
export const u_formatTimestamp = (time, conf) => {
  let config = Object.assign({
    type: 'all', // 转换类型，"all"、"ymd"、"ymdhm"
    markFrot: "-", // 年月日的连接符，默认“-”
    markBack: ":" // 时分秒的连接符，默认“:”
  }, conf);
  let date = new Date(time),
    year = date.getFullYear(),
    month = formatNumber(date.getMonth() + 1),
    day = formatNumber(date.getDate()),
    hour = formatNumber(date.getHours()),
    minute = formatNumber(date.getMinutes()),
    second = formatNumber(date.getSeconds());
  switch (config.type) {
    case "ymd":
      return `${year}${config.markFrot}${month}${config.markFrot}${day}`;
      break;
    case "ymdhm":
      return `${year}${config.markFrot}${month}${config.markFrot}${day} ${hour}${config.markBack}${minute}`;
      break;
    default:
      return `${year}${config.markFrot}${month}${config.markFrot}${day} ${hour}${config.markBack}${minute}${config.markBack}${second}`;
      break;
  }
}

// 将一位数转换成0开头，例如： 1->01，0->09
export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
 * 将数字保留n位小数
 */
export const u_fixed = (val, n = 2) => {
  return (val - 0).toFixed(n);
}

export const u_throttle = (fn, delay, duration) => {
  let timer = null;
  let start = new Date();
  return function () {
    let current = new Date();
    const args = arguments;
    timer && clearTimeout(timer);
    if (current - start >= duration) {
      fn.apply(this, args);
      start = current;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  }
}

//防抖函数
export const debounce = function (callback, wait = 1000) {
  let timer;
  return function () {
    let ctx = this;
    let args = arguments;

    if (timer) {
      clearTimeout(timer)
    };

    timer = setTimeout(() => {
      callback.apply(ctx, args)
    }, wait);
  }
}
