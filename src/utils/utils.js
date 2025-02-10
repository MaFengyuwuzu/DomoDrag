/**
 * 
 * @param {新数组} initialArr 
 * @param {对象} obj 
 * @param {key} pro 
 * @returns 
 */
export function formateArrObjData(initialArr, obj, pro) {
  var problems = null;
  let index = initialArr.findIndex((val) => val[pro] === obj[pro])
  // 如果有就替换  没有就添加
  if (initialArr.findIndex((val) => val[pro] === obj[pro]) !== -1) {
    problems = true
  } else {
    problems = false
  }
  return problems
}


/**
 *
 * @param {value} data // 对象参数值具体如下
 * @param {value} value // 对象参数值具体如下
 */

export function datalength(data) {
  var problems = null;

  for (let i = 0; i < data.length; i++) {
    if (data[i].projectList.length === 0) {
       problems = false
       break;
    } else {
      for (let k = 0; k < data[i].projectList.length; k++) {
        if (data[i].projectList[k].content.length == 0) {
          problems = false
          break;
        } else {
          problems = true
        }
      }
    }
  }
  return problems
}

export function formatDate (fmt) {
  const date = new Date()
  const o = {
    'Y+': date.getFullYear(),
    'M+': date.getMonth() + 1, // 月
    'D+': date.getDate(), // 日
    'h+': date.getHours(), // 时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    W: date.getDay() // 周
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, () => {
        if (k === 'W') {
          // 星期几
          const week = ['日', '一', '二', '三', '四', '五', '六']
          return week[o[k]]
        } else if (k === 'Y+' || RegExp.$1.length === 1) {
          // 年份 or 小于10不加0
          return o[k]
        } else {
          return ('00' + o[k]).substr(('' + o[k]).length) // 小于10补位0
        }
      })
    }
  }
  return fmt
}

