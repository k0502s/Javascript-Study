//// name property



function a () { }
console.log(a.name)
////
const b = function () { }
console.log(b.name)
////
const c = function cc () { }
console.log(c.name)
////
const d = () => {}
console.log(d.name)
////
const e = {
  om1: function () {},
  om2 () {},
  om3: () => {}
}
console.log(e.om1.name, e.om2.name, e.om3.name)
/////

class F {
  static method1 () {}
  method2 () {}
}
const f = new F()
console.log(F.method1.name, f.method2.name)

/////

function G () {}
G.method1 = function () {}
G.prototype.method2 = function () {}


const g = new G()
console.log(G.method1.name, g.method2.name)


/////

const g = new Function()
console.log(g.name)

/////

function a () { }
const b = function () { }
const h = a.bind(b)
console.log(h.name)

/////


const person = {
  _name: '재남',
  get name () {
    return this._name
  },
  set name (v) {
    this._name = v
  }
}
const descriptor = Object.getOwnPropertyDescriptor(person, 'name')
console.log(descriptor.get.name)
console.log(descriptor.set.name)



///// new.target




function Person (name) {
  if (this instanceof Person) {
    this.name = name
  } else {
    throw new Error('new 연산자를 사용하세요.')
  }
}
var p1 = new Person('재남')
console.log(p1)

var p2 = Person('성훈')
console.log(p2)

var p3 = Person.call({}, '곰')
console.log(p3)

var p4 = Person.call(p1, '곰')
console.log(p4)

//////

function Person (name) {
  console.dir(new.target)
  if (new.target !== undefined) {
    this.name = name
  } else {
    throw new Error('new 연산자를 사용하세요.')
  }
}

const p1 = new Person('재남')
console.log(p1)

const p2 = Person('성훈')
console.log(p2)

const p3 = Person.call({}, '곰')
console.log(p3)

const p4 = Person.call(p1, '곰')
console.log(p4)

/////
function Person (name) {
  const af = n => {
    this.name = n
    console.log(new.target)
  }
  af(name)
}
const p1 = new Person('재남')
const p2 = Person('성훈')

//////

function Person (name) {
  this.name = name
}
function Android (name) {
  Person.call(this, name)
}
const p1 = new Android('재남봇')

/////

/////
function Person (name) {
  console.log(new.target)
  if (new.target === Person) {
    this.name = name
  } else {
    throw new Error('Person 생성자함수를 new로 호출해야 해요!')
  }
}
function Android (name) {
  Person.call(this, name)
}
const p2 = new Android('재남봇')
////




