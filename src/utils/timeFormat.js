// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
const timeFormat = function (dateTime = null, fmt = 'yyyy-mm-dd') {
	// 如果为null,则格式化当前时间
	if (!dateTime) dateTime = Number(new Date());
	let date = new Date(dateTime);
	let ret;
	let opt = {
		"y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"h+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"s+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		}
	}
	return fmt;
}



/**
 * 获取多少天后的日期
 */
const delayTimeFormat = function (dateTime = null, fmt = 'yyyy-mm-dd', delay = 7) {
	// 如果为null,则格式化当前时间
	if (!dateTime) dateTime = Number(new Date());
	// 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
	if (dateTime.toString().length == 10) dateTime *= 1000;
	dateTime = dateTime + (delay * 60 * 60 * 24);
	let date = new Date(dateTime);
	let ret;
	let delayDate = new Date(date)
	delayDate.setDate(date.getDate() + delay)
	let opt = {
		"y+": delayDate.getFullYear().toString(), // 年
		"m+": (delayDate.getMonth() + 1).toString(), // 月
		"d+": delayDate.getDate().toString(), // 日
		"h+": delayDate.getHours().toString(), // 时
		"M+": delayDate.getMinutes().toString(), // 分
		"s+": delayDate.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		}
	}
	return fmt;
}

/**
 * 时间戳转为多久之前
 * @param String timestamp 时间戳
 * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 */
function timeForm(dateTime = null, format = 'yyyy-mm-dd') {
	// 如果为null,则格式化当前时间
	if (!dateTime) dateTime = Number(new Date());
	// 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
	if (dateTime.toString().length == 10) dateTime *= 1000;
	let timestamp = +new Date(Number(dateTime));

	let timer = (Number(new Date()) - timestamp) / 1000;
	// 如果小于5分钟,则返回"刚刚",其他以此类推
	let tips = '';
	switch (true) {
		case timer < 300:
			tips = '刚刚';
			break;
		case timer >= 300 && timer < 3600:
			tips = parseInt(timer / 60) + '分钟前';
			break;
		case timer >= 3600 && timer < 86400:
			tips = parseInt(timer / 3600) + '小时前';
			break;
		case timer >= 86400 && timer < 2592000:
			tips = parseInt(timer / 86400) + '天前';
			break;
		default:
			// 如果format为false，则无论什么时间戳，都显示xx之前
			if (format === false) {
				if (timer >= 2592000 && timer < 365 * 86400) {
					tips = parseInt(timer / (86400 * 30)) + '个月前';
				} else {
					tips = parseInt(timer / (86400 * 365)) + '年前';
				}
			} else {
				tips = timeFormat(timestamp, format);
			}
	}
	return tips;
}

/**
 * 计算距今时间
 * @param {String} str 日期
 * @returns 
 */
const countDay = (strDate) => {
	if (!strDate) return;
	let s1 = new Date(strDate);
	let s2 = new Date();
	let days = s1.getTime() - s2.getTime();
	let time = parseInt(days / (1000 * 60 * 60 * 24));
	return time;
}

export {
	timeForm,
	delayTimeFormat,
	timeFormat,
	countDay
}