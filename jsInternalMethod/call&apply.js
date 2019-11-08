/**
 * 模拟实现call
 */

// 第一步：分两步
// 1. 方法挂在在context下
// 2. 使用eval调用函数，可以实现数组传入参数
Function.prototype.call = function(context) {
	context.fn = this
	var args = []
	for (var i = 1; i < arguments.length; i++) {
		args.push(arguments[i])
	}
	eval('context.fn(' + args + ')')
	delete context.fn
}

// 第二步: 三个细节
// 1、this 参数可以传 null 或者 undefined，此时 this 指向 window
// 2、this 参数可以传基本类型数据，原生的 call 会自动用 Object() 转换
// 3、函数是可以有返回值的
Function.prototype.call = function (context) {
	context = typeof context === null || typeof context === undefined ? Window : Object(context)
	context.fn = this
	var args = []
	for (var i = 1; i < arguments.length; i++) {
		args.push(arguments[i])
	}
	var ret = eval('context.fn(' + args + ')')
	delete context.fn
	return ret
}


/**
 * 同理模拟实现call
 */
Function.prototype.apply = function (context, arr) {
	context = context ? Object(context) : window;
	context.fn = this;
	var ret;
	// 判断是否存在第二个参数
	if (!arr) {
		ret = context.fn();
	} else {
		var args = [];
		for (var i = 0, len = arr.length; i < len; i++) {
			args.push(arr[i])
		}
		ret = eval('context.fn(' + args + ')');
	}
	delete context.fn
	return ret;
}