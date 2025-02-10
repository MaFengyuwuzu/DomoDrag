
/**
 * 深度克隆
 * @param {Object | Array} obj
 * @returns {Object | Array}
 */
const deepClone = (obj) => {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== "function") {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (let i in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
};

/**
 * 下划线转换驼峰
 * @param {String} name
 * @returns
 */
const toHump = (name) => {
  return name.replace(/\\_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
};

/**
 * 驼峰转换下划线
 * @param {String} name
 * @returns
 */
const toLine = (name) => {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase();
};

/**
 * 判断是否为空
 */
function isEmpty(value) {
  switch (typeof value) {
    case "undefined":
      return true;
    case "string":
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0) return true;
      break;
    case "number":
      if (isNaN(value)) return true;
      break;
    case "object":
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * 是否json字符串
 */
function isJsonString(value) {
  if (typeof value == "string") {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * 是否数组
 */
function isArray(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
 * 是否对象
 */
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * RGB转化为HEX
 * @param {string} data 如：rgb(0,0,0)
 */
function colorHex(data) {
  // RGB颜色值的正则
  let reg = /^(rgb|RGB)/;
  let color = data;
  if (reg.test(color)) {
    let strHex = "#";
    // 把RGB的3个数值变成数组
    let colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    // 转成16进制
    for (let i = 0; i < colorArr.length; i++) {
      let hex = Number(colorArr[i]).toString(16);
      if (hex.length == "1") {
        hex = "0" + hex;
      }
      strHex += hex;
    }
    return strHex;
  } else {
    return color.toString();
  }
}

/**
 * HEX转化为RGB
 * @param {string} data 如：#ffffff、#fff
 */
function colorRgb(data) {
  // 16进制颜色值的正则
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 把颜色值变成小写
  let color = data.toLowerCase();
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    let colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return "RGB(" + colorChange.join(",") + ")";
  } else {
    return color;
  }
}

/**
 * 富文本转化
 * @param {string} data
 */
function tagText(data) {
  const regP = /<p>(.*?)<\/p>/;
  const regImg = /<img.*?alt="(.*?)"\/>/;
  data = data.replace(new RegExp(regP, "g"), "$1");
  data = data.replace(new RegExp(regImg, "g"), "$1");
  return data;
}

/**
 * 处理图片地址
 * @param {String} e
 */
function formatBlob(e) {
  return window.URL.createObjectURL(e);
}

// Base64 转 Blob
function dataURLtoBlob(dataurl, mime) {
  let bstr = atob(dataurl);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: "image/" + mime
  })
}
/**
 * 从base64编码的图片中获取扩展名
 * @param {String} base64
 * @returns
 */
function getExtensionFromBase64(base64) {
  let re = new RegExp('data:image/(?<ext>.*?);base64,.*')
  let res = re.exec(base64)
  if (res) {
    return res.groups.ext
  }
}

/**
 * 生成图片缩略图路径
 */
function getThumbnails(url) {
  if (!url) return;
  let result = "";
  let pitStr = "%2F";
  if (url.indexOf("%2F") == -1) {
    pitStr = '/'
  }
  let pathnameArr = url.split(pitStr);
  pathnameArr[pathnameArr.length - 1] = "thumb_" + pathnameArr[pathnameArr.length - 1];
  result = pathnameArr.join(pitStr);
  result = result.substring(0, result.lastIndexOf(".")) + ".jpg";
  return result;
}

/**
 * 获取文件名称及后缀
 */
function getFileInfo(url) {
  if (!url || !url.length) return;
  let result = {};
  let pathnameArr = url.split("%2F");
  result.name = pathnameArr[pathnameArr.length - 1];
  result.type = url.substring(url.lastIndexOf(".") + 1, url.length).toLowerCase();
  return result;
}

/**
 * @name: 去掉数字（整数、小数）前面多余的零
 * @description:
 * 1.如果是整数：去掉整数前的零 例如：0098765--->98765
 * 2.如果是小数：去掉小数前的零 例如：000.333--->0.333 再例如000.00--->0.00
 * @author: mm
 * @date: 2023/3/23
 */
//处理其他模块
function prefix_excpet_0(x){
  if(x=='0.00' || x=='0' || x==''){
    x = '0.00'
    return  x
  }
  x = (x+'').replace( /0*([1-9]\d*|0\.\d+)/,'$1');
  x.match(/^0+[1-9]+/) ? x = x.replace(/^0+/g,'') : x;
  x = Number(x) ? x : '';
  x =changeTwoDecimal_f(x)
  return x;
}
//单独处理轴向
function prefix_excpet_1(x){
  if(x=='0.00' || x=='0' || '' || x=='000'){
    x = '0'
    return  x
  }
  x = (x+'').replace( /0*([1-9]\d*|0\.\d+)/,'$1');
  x.match(/^0+[1-9]+/) ? x = x.replace(/^0+/g,'') : x;
  x = Number(x) ? x : '';
  return x;
}

//正常的处理
function prefix_excpet_2(x){
  if(x=='0.00' || x=='0' || x=='000' || x=='+00.00'){
    x = '0.00'
    return  x
  }
  if( x=='-00.00'){
    x = '-00.00'
    return  x
  }
  x = (x+'').replace( /0*([1-9]\d*|0\.\d+)/,'$1');
  x.match(/^0+[1-9]+/) ? x = x.replace(/^0+/g,'') : x;
  x = Number(x) ? x : '';
  if(x){
  x = this.changeTwoDecimal_f(x)
  }
  return x;
}



//保留两位小数（自动填补删除0）
function changeTwoDecimal_f(x){
  var f_x = parseFloat(x);
  if (isNaN(f_x)){return 0;}
  f_x = Math.round(x*100)/100;
  var s_x = f_x.toString();
  var pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0){pos_decimal = s_x.length;s_x += '.';}
  while (s_x.length <= pos_decimal + 2){s_x += '0';}
  return s_x;
}

/**
 * 阿拉伯数字转中文
 * @param num {Number} 需转化的数字
 * @param type {Boolean} 是否大写
 * @return {number|string}
 */
function numToCapital(num, type = '') {
  if (!num) return 0
  const strNum = Number((num + '').replace(/[,，]*/g, '')) + '' // 记录字符
  num = parseInt(Number(strNum)) // 转为整数，
  let capitalAr = '零一二三四五六七八九十'
  let unitAr = ['十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千']
  if (type) {
    capitalAr = '零壹贰叁肆伍陆柒捌玖拾'
    unitAr = ['拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟'] // 单位
  }
  const resultAr = [] // 记录结果，后边json.in就可
  let index = strNum.length - 1 //记录位数
  let idx = 0 // 记录单位
  let percent = 10
  const turnNum = (num, percent, index) => {
    const unit = num / percent
    const capital = capitalAr[Number(strNum[index])]
    if (unit < 1) {
      resultAr.push(capital)
      // 出现11【一十一】这种情况
      if (Number(strNum[index]) === 1 && (strNum.length === 2 || strNum.length === 6 || strNum.length === 10)) {
        resultAr.pop()
      }
      return false //结束递归
    } else {
      if (capital === '零') {
        // 万和亿单位不删除
        if (!['万', '亿'].includes(resultAr[resultAr.length - 1])) {
          resultAr.pop()
        }
        // 前面有零在删掉一个零
        if (resultAr[resultAr.length - 1] === '零') {
          resultAr.pop()
        }
      }
      resultAr.push(capital)
      // 过滤存在【零万】【零亿】这种情况
      if (['万', '亿'].includes(resultAr[resultAr.length - 2]) && capital === '零') {
        resultAr.pop()
      }
      // 过滤【1亿万】这种情况
      if (resultAr[0] === '万' && resultAr[1] === '亿') {
        resultAr.shift()
      }
      // 末尾【零】删掉
      if (resultAr[0] === '零') {
        resultAr.pop()
      }
      resultAr.push(unitAr[idx++])
      turnNum(num, percent * 10, --index)
    }
  }
  turnNum(num, percent, index)
  return resultAr.reverse().join('')
}

/**
 * 格式化 Hls字段
 * @param {Object} data
 */
function formatPatientl(data) {
  if (!data) return;
  // nationality: '', //国籍
  // cardType: '', //证件类型
  const apiData = {
    name: data.brxm, //姓名
    telephone: data.brdh, //电话
    cardId: data.sfzh, //证件号码
    sex: data.brxb, //性别
    age: data.brnl, //年龄
    birthday: data.csrq, //出生日期
    address: data.brzz, //通讯地址
    patid: data.patid, //病人id，
    sbkh: data.sbkh, //社保卡号，
    ybkh: data.ybkh, //医保卡号，
    ynkh: data.ynkh, // 医保卡号，
    blh: data.blh, //病例号,
    jzid: data.jzid //就诊id(门诊就诊id,住院登记id)
  };
  return apiData;
}

const tool = {
  deepClone,
  toHump,
  toLine,
  isArray,
  isObject,
  isJsonString,
  isEmpty,
  colorHex,
  colorRgb,
  tagText,
  formatBlob,
  dataURLtoBlob,
  getThumbnails,
  getFileInfo,
  numToCapital,
  formatPatientl,
  prefix_excpet_0,
  prefix_excpet_1,
  prefix_excpet_2,
  changeTwoDecimal_f
};
export default tool;