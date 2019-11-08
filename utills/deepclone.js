/**
 * 深拷贝
 */
function deepclone(sourcez) {

}

// 第一步：简单实现
// 1-1. 初步实现对象的简单浅拷贝
function cloneShallow(source) {
	var target = {}
	for (var key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			target[key] = source[key]
		}
	}
	return target
}
// 1-2. 初步实现对象的深拷贝
function clonedeep1(source) {
	var target = {}
	for (var key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			if (typeof source[key] === 'object') {
				target[key] = clonedeep1(source[key])
			} else {
				target[key] = source[key]
			}
		}
	}
	return target
}

// 第二部：兼容数组的写法
// 2-1. 兼容数组的写法
/**
* Quick object check - this is primarily used to tell
* Objects from primitive values when we know the value
* is a JSON-compliant type.
*/
function isObject(obj) {
	return typeof obj === 'object' && obj != null;
}

function clonedeep2(source) {
	if (!isObject(source)) return source
	var target = Array.isArray(source) ? [] : {}
	for (var key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			if (isObject(source[key])) {
				target[key] = clonedeep2(source[key])
			} else {
				target[key] = source[key]
			}
		}
	}
	return target
}

// 第三部：循环引用 (略)
// 第四部：拷贝symbol

// 第五步：破解递归爆栈(略)
// loadash 还实现了 函数、正则、Date、Buffer、Map、Set、原型链等情况下的深拷贝



// 测试用例
var a = {
	name: "muyiy",
	book: {
		title: "You Don't Know JS",
		price: "45"
	},
	a1: undefined,
	a2: null,
	a3: 123
}
