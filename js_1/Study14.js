/// Class

function Person1 (name) {
  this.name = name
}
Person1.prototype.getName = function () {
  return this.name
}
Person1.isPerson = function (obj) {
  return obj instanceof this
}
const jin1 = new Person1('jinseok')
console.log(jin1.getName())
console.log(Person1.isPerson(jin1))

////

class Person2 {
    constructor (name) { this.name = name}
    getName () { return this.name}
    static isPerson (obj) { return obj instanceof this}
}
const jin2 = new Person2('jinseok')
console.log(jin2.getName())
console.log(Person2.isPerson(jin2))

///

// 클래스 리터럴
class Person1 { }
console.log(Person1.name)

// 기명 클래스 표현식
const Person2 = class Person22 { }
console.log(Person2.name)

// 익명 클래스 표현식
let Person3 = class { }
console.log(Person3.name)

// let, const와 마찬가지로 TDZ가 존재하며, 블록스코프에 갇힌다.

if(true) {
    class A { }
    const a = new A() //실행 ok
    if(true) {
        const b = new A() //TDZ
        class A { }
    }
}
const c = new A()


////class 내부는 strict mode가 강제된다. 모든 메소드를 열거할 수 없다. (콘솔에서 색상이 흐리게 표기됨)

class A {
  a () { }
  b () { }
  static c () { }
}

for (let p in A.prototype) {
  console.log(p)
}

A.prototype.a = function () { }
A.prototype.d = function () { }

for (let p in A.prototype) {
  console.log(p)
}

//constructor를 제외한 모든 메소드는`new` 명령어로 호출할 수 없다.

class A {
  constructor () { }
  a () { }
  static b () { }
}
const a = new A.prototype.constructor()
const b = new A.prototype.a()
const c = new A.prototype.b()

const d = new A()
const e = new d.constructor()

///생성자로서만 동작한다.

class A { }
A()

////클래스 내부에서 클래스명 수정


let A = class {
  constructor () { A = 'A' }
}
const a = new A()
console.log(A)

const B = class {
  constructor () { B = 'B' }
}
const b = new B()

class C {
  constructor () { C = 'C' }
}
const c = new C()


///클래스 외부에서 클래스명 수정

let A = class { }
A = 10;             // ok

const B = class { }
B = 10;             // Uncaught Type Error: Assignment to constant variable

class C { }
C = 10;             // ok  



///외부에서 prototype을 다른 객체로 덮어씌울 수 없다 (읽기전용)

class A {
  a () { }
}
A.prototype = {
  a () { console.log(1) }
}
const a = new A()
a.a()




///'문'이 아닌 '식'이다.

const instanceGenerator = (className, ...params) => new className(...params)
class Person {
    constructor (name) {this.name = name}
    sayName () {console.log(this.name)}
}

const jin = instanceGenerator(Person, 'jinseok')
const jin2 = instanceGenerator(class {constructor (name) {this.name = name}
sayName () {console.log(this.name)}
}, '진석')

jin.sayName()
jin2.sayName()
                                                          
//   computed property names


const method1 = 'sayName'
const fullNameGetter = 'fullname'
class Person {
  constructor (name) { this.name = name }
  [method1] () { console.log(this.name) }
  get [fullNameGetter] () { return this.name + ' kim' }
}
const jin = new Person('jinseok')
jin.sayName()
console.log(jin.fullname)



//제너레이터

class A {
  *generator () {
    yield 1
    yield 2
  }
}
const a = new A()
const iter = a.generator()
console.log(...iter)


//Symbol.iterator

class Products {
  constructor () {
    this.items = new Set()
  }
  addItem (name) {
    this.items.add(name)
  }
  [Symbol.iterator] () {
    let count = 0
	  const items = [...this.items]
    return {
      next () {
        return {
          done: count >= items.length,
          value: items[count++]
        }
      }
    }
  }
}
const prods = new Products()
prods.addItem('사과')
prods.addItem('배')
prods.addItem('포도')
for (let x of prods) {
  console.log(x)
}



///


class Products {
  constructor () {
    this.items = new Set()
  }
  addItem (name) {
    this.items.add(name)
  }
  *[Symbol.iterator] () {
    yield* this.items
  }
}
const prods = new Products()
prods.addItem('사과')
prods.addItem('배')
prods.addItem('포도')
for (let x of prods) {
  console.log(x)
}


///정적 메소드 (static method)

class Person {
  static create (name) {
    return new this(name)
  }
  constructor (name) {
    this.name = name
  }
}
const jn = Person.create('재난')
console.log(jn)


/// 클래스 상속


function Square (width) {
  this.width = width
}

Square.prototype.getArea = function () {
  return this.width * (this.height || this.width)
}

function Rectangle (width, height) {
  Square.call(this, width)
  this.height = height
}

function F() { }

F.prototype = Square.prototype
Rectangle.prototype = new F()
Rectangle.prototype.constructor = Rectangle

const square = Square(3)
const rect = new Rectangle(3, 4)

console.log(rect.getArea())
console.log(rect instanceof Rectangle)
console.log(rect instanceof Square)

//

class Square {
  constructor (width) {
    this.width = width
  }
  getArea () {
    return this.width * (this.height || this.width)
  }
}
class Rectangle extends Square {
  constructor (width, height) {
    super(width)
    this.height = height
  }
}

const rect = new Rectangle(3, 4)
console.log(rect.getArea())
console.log(rect instanceof Rectangle)
console.log(rect instanceof Square)


///
class Employee extends class Person {
  constructor (name) { this.name = name }
} {
  constructor (name, position) {
    super(name)
    this.position = position
  }
}
const jn = new Employee('jinseok', 'student')

////함수도 상속 가능.

function Person (name) { this.name = name }
class Employee extends Person {
  constructor (name, position) {
    super(name)
    this.position = position
  }
}
const jin = new Employee('jinseok', 'student')

////

class Employee extends function (name) { this.name = name } {
  constructor (name, position) {
    super(name)
    this.position = position
  }
}
const jin = new Employee('jinesok', 'student')

///내장 타입 상속 가능

class NewArray extends Array {
  toString () {
    return `[${super.toString()}]`
  }
}
const arr = new NewArray(1, 2, 3)
console.log(arr)
console.log(arr.toString())

///super (내부키워드로써, 허용된 동작 외엔 활용 불가)

class Rectangle {
  constructor (width, height) {
    this.width = width
    this.height = height
  }
  getArea () {
    return this.width * this.height
  }
}
class Square extends Rectangle {
  constructor (width) {
    console.log(super)
    super(width, width)
  }
  getArea () {
    console.log('get area of square.')
    console.dir(super)
    return super.getArea()
  }
}
const square = new Square(3)
console.log(square.getArea())



///`new.target`을 활용한 abstract class 흉내


class Shape {
  constructor () {
    if(new.target === Shape) {
      throw new Error('이 클래스는 직접 인스턴스화할 수 없는 추상클래스입니다.')
    }
  }
  getSize () {}
}
class Rectangle extends Shape {
  constructor (width, height) {
    super()
    this.width = width
    this.height = height
  }
  getSize () {
    return this.width * this.height
  }
}
const s = new Shape()
const r = new Rectangle(4, 5)



