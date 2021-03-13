/// set


Array.prototype.pushUnique = value =>{
    if(!this.include(value)){
        this.push(value)
    }
}return this
const arr = [1, 2, 3]
arr.pushUnique(5)
arr.pushUnique(4)
arr.pushUnique(3)
console.log(arr)


const set = new Set([1,2,3])
set.add(5)
set.add(4)
set.add(3)
console.log(set)

////

const set = new Set()
set.add(5)
set.add('5')
set.add(-0)
set.add(+0)

console.log(set.size)

console.log(set.has(5))
console.log(set.has(6))

set.delete(5)
console.log(set.has(5))

set.clear()
console.log(set.size)
console.log(set)

////


const set1 =new Set([1, 2, 3, 4, 5, 3, 4, 2])
console.log(set1)

const map = new Map()
map.set('a', 1).set('b',2).set({},3)
const set2 = new Set(map)
console.log(set2)

///

const gen = function* () {
    for (let i=0; i<5; i++){
        yield i+1
    }
}
const set = new Set(gen())
console.log(set)

///

set.forEach(function(key, value, ownerSet) {
  console.log(key, value, this)
}, {})

console.log(set[1])


///


const set = new Set([1, 2, 3, 3, 4, 4, 5, 5, 1])
const arr = [...set]
console.log(arr)


///


const makeUniqueArray = arr => [...new Set(arr)]
const arr = [1, 2, 3, 3, 4, 4, 5, 5, 1]

const newArr = makeUniqueArray(arr)
console.log(newArr)


/// WeakSet

const isMarked = new WeakSet()
const attachedData = new WeakMap()

class Node {
    constructor (id){
      this.id=id  
    }
mark(){isMarked.add(this)}
unmark(){isMarked.delete(this)}
set data (data) {attachedData.set(this, data)}
get data () {return attachedData.get(this)}      
}
let foo = new Node('foo')
foo.mark()
foo.data = 'bar'
console.log(foo.data)

isMarked.has(foo)
attachedData.has(foo)

foo =null

isMarked.has(foo)
attachedData.has(foo)


/// 객체의 단점 예시


const o = { a: 1, b: 2, c: 3 }

// (1)
for (let key in o) {
  console.log(key, o[key])
}

// (2)
Object.prototype.method = function () { }
for (let key in o) {
  console.log(key, o[key])
}

// (3)
for (let key in o) {
  if(o.hasOwnProperty(key)) {
    console.log(key, o[key])
  }
}

// (4)
const obj2Arr = obj => {
  const arr = []
  for (let key in obj) {
    if(obj.hasOwnProperty(key)) {
      arr.push([key, obj[key]])
    }
  }
  return arr
}
const oArr = obj2Arr(o)
oArr.forEach(v => console.log(v))

// (5)
const oArr2 = Object.keys(o).map(k => [k, o[k]])
oArr2.forEach(v => console.log(v))


///


const obj = {
  1: 10,
  2: 20,
  3: 30
}
let res = 0
for (let key in obj) {
  res += key
}
console.log(res)

///

const obj = {
  1: 10,
  01: 20,
  '01': 30
}
console.log(obj)

///


const obj = { a: 1, b: 2, c: 3 }
console.log(Object.keys(obj).length)



// 객체의 단점을 보안한 map의 기능들


const map = new Map()
map.set(1, 10)
map.set(01, 20)
map.set('01', 30)
map.set({}, 40)
map.set(function(){}, ()=>{})
console.log(map)

///

const map = new Map()
map.set('name', 'jinseok')
map.set('age', 30)

console.log(map.size)

console.log(map.get('name'))
console.log(map.get('age'))

map.delete('name')
console.log(map.has('name'))
console.log(map.has('age'))
console.log(map.size)

map.clear()
console.log(map.has('name'))
console.log(map.has('age'))
console.log(map.size)


///


const map1 = new Map([[10, 10], ['10', '10'], [false, true]])
console.log(map1)

const map2 = new Map(map1)
console.log(map2)
console.log(map1 === map2)

const gen = function* () {
	for (let i = 0; i < 5; i++) {
		yield [i, i+1]
  }
}
const map3 = new Map(gen())
console.log(map3)

///

const map = new Map([[10, 10], ['10', '10'], [false, true], ['name', 'jinseok']])
const mapKeys = map.keys()
const mapValues = map.values()
const mapEntries = map.entries()

map.forEach(function(value, key, ownerMap) {
  console.log(`${key}: ${value}`)
  console.log('ownerMap: ', ownerMap, 'this: ', this)
}, [])

///

const map = new Map([[10, 10], ['10', '10'], [false, true], ['name', 'jinseok']])
const mapArray1 = [...map]
const mapArray2 = [...map.keys()]
const mapArray3 = [...map.values()]
const mapArray4 = [...map.entries()]

console.log(mapArray1, mapArray2, mapArray3, mapArray4)

///



const map1 = new Map([[10, 10], ['10', '10'], [false, true], ['name', 'jinseok']])
const map2 = new Map([[{}, 10], [function(){}, '10'], [[], true], [Symbol('심볼'), 'jinseok']])
const convertMapToObject = map => {
  const resultObj = {}
  [...map].forEach(([k, v]) => {
    if(typeof k !== 'object') {
      resultObj[k] = v
    }
  })
  return resultObj
}
const obj1 = convertMapToObject(map1)
const obj2 = convertMapToObject(map2)


// WeakMap

const obj1 = { a: 1 }
const map = new Map()
map.set(obj1, 10)
obj1 = null
console.log(map)

const obj2 = { b: 2 }
const wmap = new WeakMap()
wmap.set(obj2, 20)
obj2 = null

//


const weakmapValueAdder = (wmap, key, addValue) => {
  wmap.set(key, Object.assign({}, wmap.get(key), addValue))
}
const Person = (() => {
  const privateMembers = new WeakMap()
  return class {
    constructor(n, a) {
      privateMembers.set(this, { name: n, age: a })
    }
    set name (n) {
      weakmapValueAdder(privateMembers, this, { name: n })
    }
    get name () {
      return privateMembers.get(this).name
    }
    set age (a) {
      weakmapValueAdder(privateMembers, this, { age: a })
    }
    get age () {
      return privateMembers.get(this).age
    }
  }
})()
const jn = new Person('재남', 30)
console.log(jn.name, jn.age, jn)

jn.age = 25
console.log(jn.name, jn.age, jn)

const sh = new Person('서훈', 28)
console.log(sh.name, sh.age, sh)

sh.name = '성후'
console.log(sh.name, sh.age, sh)

///

# TODO: 온라인에는 삭제하고 올리기.

- DOM Element Event 관리


const domInformations = new WeakMap()
const eventMap = new WeakMap()

document.body.innerHTML = `
<div id="a">클릭하세요 A</div>
<div id="b">클릭하세요 B</div>
<div id="c">클릭하세요 C</div>`.trim()

let elemA = document.getElementById('a')
let elemB = document.getElementById('b')
let elemC = document.getElementById('c')

domInformations.set(elemA, {clicked: 0})
domInformations.set(elemB, {clicked: 0})
domInformations.set(elemC, {clicked: 0})

const addEventListener = (elem, evt, listener, isCapture) => {
	elem.addEventListener(evt, listener, isCapture)
	if(!eventMap.has(elem)) {
    eventMap.set(elem, new Map())
  }
	const evtElem = eventMap.get(elem)
  evtElem.set(evt, listener)
	eventMap.set(elem, evtElem)
}

const removeEventListener = (elem, evt) => {
	const targetElem = eventMap.get(elem)
	const listener = targetElem.get(evt)
  elem.removeEventListener(evt, listener)
	// targetElem.delete(evt)
	if(!targetElem.size) {
		eventMap.delete(elem)
  }
}

const elemListener = (elem, evt, willRemoveCallback) => function () {
  let elemData = domInformations.get(elem)
  elemData.clicked++
  domInformations.set(elem, elemData)
  console.log(`${elem.id}: ${elemData.clicked}번 클릭하셨습니다.`)

  if(elemData.clicked >= 5) {
    removeEventListener(elem, evt)
    willRemoveCallback(elem)
  }
}

addEventListener(elemA, 'click', elemListener(elemA, 'click', () => {
  elemA = null
}))
addEventListener(elemB, 'click', elemListener(elemB, 'click', () => {
  elemB.remove()
}))
addEventListener(elemC, 'click', elemListener(elemC, 'click', () => {
  elemC.remove()
	elemC = null
}))

