
/**
 * 实现new
 */
function create(con) {
	var obj = new Object()
	obj.__proto__ = con.prototype
	var res = con.apply(obj, arguments.slice(1))
	return typeof res === 'object' ? res : obj
}

