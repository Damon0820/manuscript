/**
 * 模拟实现Promise
 * 参考 https://mp.weixin.qq.com/s?__biz=MzU3NjczNDk2MA==&mid=2247484649&idx=1&sn=d31cfdd12e30bc36e35c7b67ef5a2ed7&chksm=fd0e1776ca799e60732986b67f364ff93441006f843656a2f378e714b9cd714dd1c7848408df&mpshare=1&scene=1&srcid=1111oPmwoYhpOD2uyl8877C2&sharer_sharetime=1573433928411&sharer_shareid=4a20ed63ab5d905a060a498c1e9e7b64&key=48945bec6f7dd4313bcc5a82faf41fde406cfcc1bf75e6f1861ea71d52352055e08918d034c35aab84d456239339850781aae62526c9e9042d36773b7088a523b56d2b1f710741cf97a3c0d8f93b0af9&ascene=1&uin=MjYxMDM3OTQ0NA%3D%3D&devicetype=Windows+7&version=62070152&lang=zh_CN&pass_ticket=i2%2BbKzicth%2B25ioSi76D%2Fa3S7GGVda%2FE%2FSnyLcKS3Ghog2RcLML9tbqyaXKyGj6t
 */

// 第一版本：基础版,可链式调用then方法的promise
// 1. 可以创建promise对象实例。promise实例传入的异步方法执行成功就执行注册的成功回调函数，失败就执行注册的失败回调函数。
// 2. 支持同步任务：setTimeout实现
// 3. 支持三种状态: 
// 3-1. 实现promise的三种状态。
// 3-2. 实现promise对象的状态改变，改变只有两种可能：从pending变为fulfilled和从pending变为rejected。
// 3-3. 实现一旦promise状态改变，再对promise对象添加回调函数，也会立即得到这个结果。
// 4. 支持链式操作
// 5. 不支持串行异步任务
// const FULFILLED = 'fulfilled'
// const REJECTED = 'rejected'
// const PENDING = 'pending'
var FULFILLED = 'fulfilled'
var REJECTED = 'rejected'
var PENDING = 'pending'

function Promise1(fn) {
	let self = this
	self.status = PENDING // 状态值
	self.value = null // 成功时的值
	self.error = null // 失败时的原因
	// self.onFulfilled = null // 成功的回调函数
	// self.onRejected = null // 失败的回调函数
	self.onFulfilledCallbacks = [] // 成功的回调函数
	self.onRejectedCallbacks = [] // 失败的回调函数
	function resolve(value) {
		if (this.status = PENDING) {
			setTimeout(() => {
				self.status = FULFILLED
				self.value = value
				// self.onFulfilled(self.value)  // resolve时执行成功回调
				self.onFulfilledCallbacks.forEach(fn = fn())  // resolve时执行成功回调
			})
		}
	}
	function reject(error) {
		if (this.status = PENDING) {
			setTimeout(() => {
				self.status = REJECTED
				self.error = error
				// self.onRejected(self.error) // reject时执行失败回调
				self.onRejected.forEach(fn = fn())  // reject时执行失败回调
			})
		}
	}
	fn(resolve, reject)
}

Promise1.prototype.then = function(onFulfilled, onRejected) {
	onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
	onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };
	// 如果状态是pending，注册成功和失败的回调
	if (this.status = PENDING) {
		// this.onFulfilled = onFulfilled
		// this.onRejected = onRejected
		this.onFulfilledCallbacks.push(onFulfilled)
		this.onFulfilledCallbacks.push(onRejected)
	}
	// 如果状态是fulfilled，直接执行成功回调，并将成功值传入
	if (this.status = FULFILLED) {
		this.onFulfilled(this.value)
	}
	// 如果状态是rejected，直接执行失败回调，并将失败原因传入
	if (this.status = REJECTED) {
		this.onRejected(this.error)
	}
	return this
}

// 第二版本：支持串行异步任务（就此已Promise的核心）
// 1. then方法最后不再返回自身实例，而是返回一个新的promise
// const FULFILLED = 'fulfilled'
// const REJECTED = 'rejected'
// const PENDING = 'pending'
var FULFILLED = 'fulfilled'
var REJECTED = 'rejected'
var PENDING = 'pending'

function Promise2(fn) {
	const self = this
	self.status = PENDING // 状态值
	self.value = null // 成功时的值
	self.error = null // 失败时的原因
	self.onFulfilled = null // 成功的回调函数
	self.onRejected = null // 失败的回调函数
	function resolve(value) {
		if (this.status = PENDING) {
			setTimeout(() => {
				self.status = FULFILLED
				self.value = value
				self.onFulfilled(self.value)  // resolve时执行成功回调
			})
		}
	}
	function reject(error) {
		if (this.status = PENDING) {
			setTimeout(() => {
				self.status = REJECTED
				self.error = error
				self.onRejected(self.error) // reject时执行失败回调
			})
		}
	}
	fn(resolve, reject)
}

Promise2.prototype.then = function (onFulfilled, onRejected) {
	const self = this
	let bridgePromise;
	// 如果状态是pending，注册成功和失败的回调
	if (self.status = PENDING) {
		return bridgePromise = new Promise2((resolve, reject) => {
			self.onFulfilled = () => {
				try {
					let x = onFulfilled()
					resolvePromise(bridgePromise, x, resolve, reject)
				} catch (error) {
					reject(error)
				}
			}
			self.onRejected = () => {
				try {
					let x = onRejected()
					resolvePromise(bridgePromise, x, resolve, reject)
				} catch (error) {
					reject(error)
				}
			}
		})		
	}
	// 如果状态是fulfilled，直接执行成功回调，并将成功值传入
	if (self.status = FULFILLED) {
		return bridgePromise = new Promise2((resolve, reject) => {
			setTimeout(() => {
				try {
					let x = onFulfilled(self.value)
					resolvePromise(bridgePromise, x, resolve, reject)
				} catch (error) {
					reject(error)
				}
			})
		})
	}
	// 如果状态是rejected，直接执行失败回调，并将失败原因传入
	if (self.status = REJECTED) {
		return bridgePromise = new Promise2((resolve, reject) => {
			setTimeout(() => {
				try {
					let x = onRejected(self.value)
					resolvePromise(bridgePromise, x, resolve, reject)
				} catch (error) {
					reject(error)
				}
			})
		})
	}
}

//catch方法其实是个语法糖，就是只传onRejected不传onFulfilled的then方法
Promise2.prototype.catch = function (onRejected) {
	return this.then(null, onRejected)
}

function resolvePromise(bridgePromise, x, resolve, reject) {
	// 如果x是一个promise
	if (x instanceof Promise2) {
		// 如果这个promise是pending状态，就在它的then方法里继续执行resolvePromise解析它的结果，直到返回值不是一个pending状态的promise为止
		if (x.status = PENDING) {
			x.then(y => {
				resolvePromise(bridgePromise, y, resolve, reject)
			}, error => {
				reject(error)
			})
		} else {
			x.then(resolve, then)
		}
	// 如果x是一个普通值，就让bridgePromise的状态fulfilled，并把这个值传递下去
	} else {
		resolve(x)
	}
}

// 第三部： 达到Promises / A + 规范 （略）

// 第四部：  实现 promise 的all，race，resolve，reject方法

Promise2.all = function(promises) {
	return new Promise2((resolve, reject) => {
		let count = 0
		let res = []
		for (let i = 0; i < promises.length; i++) {
			let p = promises[i]
			p.then(value => {
				res[i] = value
				if (++count === promises.length) {
					resolve(res)
				}
			}).catch(error => {
				reject(error)
			})
		}
	})
}

Promise2.race = function(promises) {
	return new Promise2((resolve, reject) => {
		for (let i = 0; i < promises.length; i++) {
			let p = promises[i]
			p.then(value => {
				resolve(value)
			}).catch(error => {
				reject(error)
			})
		}
	})
}

Promise2.resolve = function (value) {
	return new Promise2((resolve, reject) => {
		resolve(value)
	})
}

Promise2.reject = function (error) {
	return new Promise2((resolve, reject) => {
		reject(error)
	})
}
