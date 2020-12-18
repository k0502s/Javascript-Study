//iterable, iterator, generator


const arr = ['a', 'b', 'c']
const set = new Set(['a', 'b', 'c'])
const map = new Map([[false, 'no'], [true, 'yes'], ['well', 'soso']])
const str = '문자열도 이터러블하다'

///

console.dir([1, 2, 3])
console.dir(new Set([1, 2, 3]))
console.dir(new Map([[0, 1], [1, 2], [2, 3]]))


///


const obj = { 0: 1, 1: 2, 2: 3, length: 3 }
console.dir(obj)





///iterable한 객체 특징



const arr = [1, 2, 3]
const map = new Map([['a', 1], ['b', 2], ['c', 3]])
const set = new Set([1, 2, 3])
const str = '이런것도 된다.'
const gene = (function* () {
  yield 1
  yield 2
  yield 3
})()



/// Array.from 메소드로 배열로 전환 가능


const arrFromArr1 = Array.from(arr)
const arrFromMap1 = Array.from(map)
const arrFromSet1 = Array.from(set)
const arrFromStr1 = Array.from(str)
const arrFromGene1 = Array.from(gene)




////spread operator로 배열로 전환 가능


const arrFromArr2 = [...arr]
const arrFromMap2 = [...map]
const arrFromSet2 = [...set]
const arrFromStr2 = [...str]
const arrFromGene2 = [...gene]




///해체할당 가능


const [arrA, , arrC] = arr
const [mapA, , mapC] = map
const [ , setB, setC] = set
const [ , strB, ...strRest] = str
const [geneA, ...geneRest] = gene
console.log(arrA, arrC)
console.log(mapA, mapC)
console.log(setB, setC)
console.log(strB, strRest)
console.log(geneA, geneRest)



/// for ... of 명령 수행 가능

for (const x of arr) {
  console.log(x)
}
for (const x of map) {
  console.log(x)
}
for (const x of set) {
  console.log(x)
}
for (const x of str) {
  console.log(x)
}
for (const x of gene) {
  console.log(x)
}


/// Promise.all`, `Promise.race` 명령 수행 가능


const a = [
  new Promise((resolve, reject) => { setTimeout(resolve, 500, 1) }),
  new Promise((resolve, reject) => { setTimeout(resolve, 100, 2) }),
  3456,
  'abc',
  new Promise((resolve, reject) => { setTimeout(resolve, 300, 3) }),
]
Promise.all(a)
  .then(v => { console.log(v) })
  .catch(err => { console.error(err) })

const s = new Set([
  new Promise((resolve, reject) => { setTimeout(resolve, 300, 1) }),
  new Promise((resolve, reject) => { setTimeout(resolve, 100, 2) }),
  new Promise((resolve, reject) => { setTimeout(reject, 200, 3) }),
])
Promise.race(s)
  .then(v => { console.log(v) })
  .catch(err => { console.error(err) })


///generator - yield*` 문법으로 이용 가능


const arr = [1, 2, 3]
const map = new Map([['a', 1], ['b', 2], ['c', 3]])
const set = new Set([1, 2, 3])
const str = '이런것도 된다.'

const makeGenerator = iterable => function* () {
  yield* iterable
}
const arrGen = makeGenerator(arr)()
const mapGen = makeGenerator(map)()
const setGen = makeGenerator(set)()
const strGen = makeGenerator(str)()

console.log(arrGen.next())
console.log(mapGen.next())
console.log(...setGen)
console.log(...strGen)


/// Iterator


const iter = {
    items : [10, 20, 30],
    count: 0,
    next () {
    const done = this.count >= this.items.length
    return{
        done,
 value: !done ?this.items[this.count++]:undefined
    }
  }
}
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())


///


const createIterator = function () {
  let count = 0
  const items = Object.entries(this)
  return {
    next () {
      return {
        done: count >= items.length,
        value: items[count++]
      }
    }
  }
}
onst obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  [Symbol.iterator]: createIterator
}
console.log(...obj)

////


const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  *[Symbol.iterator] () {
    yield* Object.entries(this)
  }
}
console.log(...obj)


////  Generator


function* gene () {
  console.log(1)
  yield 1
  console.log(2)
  yield 2
  console.log(3)
}
const gen = gene()
console.log(...gen)


///
const obj = {
    a: 1,
    b: 2,
    c: 3,
    *[Symbol.iterator] () {
    for(let prop in this){
    yield [prop, this[prop]]
    }
  }
}
console.log(...obj)

///yield* [iterable]

function* gene (){
    yield* [1, 2, 3, 4, 5]
    yield
    yield* 'abcde'
}
for(let prop of gene()){
    console.log(prop)
}

///

function* gene1(){
    yield [1, 10]
    yield [2, 20]
}
function* gene2(){
    yield [3, 20]
    yield [4, 40]
} 
function* gene3() {
    yield* gene1()
    yield* gene2()
    yield*[[5,56],[4,40]]
}
const gen = gene3()
for(let [k, v] of gen){
    console.log(k, v)
}

///

function* gene () {
  let first = yield 1
  let second = yield first + 2
  yield second + 3
}
const gen = gene()
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)


// 비동기 작업 실행

const fetchWrapper = (gen, url) => fetch(url)
  .then(res => res.json())
  .then(res => gen.next(res));

function* getNthUserInfo() {
  const [gen, from, nth] = yield;
  const req1 = yield fetchWrapper(gen, `https://api.github.com/users?since=${from || 0}`);
  const userId = req1[nth - 1 || 0].id;
  console.log(userId);
  const req2 = yield fetchWrapper(gen, `https://api.github.com/user/${userId}`);
  console.log(req2);
}
const runGenerator = (generator, ...rest) => {
  const gen = generator();
  gen.next();
  gen.next([gen, ...rest]);
}
runGenerator(getNthUserInfo, 1000, 4);
runGenerator(getNthUserInfo, 1000, 6);





