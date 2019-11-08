/**
 * js完美的继承方案：寄生组合式继承
 */

// 超类是Person，子类是Student。子类继承超类的属性和方法
function Person(name, age) {
	this.name = name
	this.age = age
	this.personColor = '五彩斑斓不带歧视人种的所有人类'
}
Person.prototype.sayName = function() {
	return 'Person sayName:' + this.name
}

function Student(name, age, grade) {
	// 继承超类私有属性和方法，且可支持传入超类构造函数参数
	Person.call(this, name, age)
	this.grade = grade
}
// object函数也可用es5的Object.create()方法代替
function Object(o) {
	function F() {}
	F.prototype = o
	return new F()
}
function inheritPrototype(subType, superType) {
	var prototype = Object(superType.prototype) // 创建对象
	prototype.constructor = subType // 增强对象
	subType.prototype = prototype // 指定对象
}
// 继承超类原型上的属性和方法
inheritPrototype(Student, Person)

Student.prototype.sayGrade = function () {
	return 'Person sayGrade:' + this.grade
}

// test：测试用例
var person = new Person('我是人', 1000000000)
var student = new Student('小明', 18, '高一')
console.log(person.name)
console.log(person.age)
console.log(person.personColor)
console.log(person.sayName())
console.log(student.name) // 继承的属性
console.log(student.age) // 继承的属性
console.log(student.personColor) // 继承的属性
console.log(student.grade)
console.log(student.sayName()) // 继承的方法
console.log(student.sayGrade())