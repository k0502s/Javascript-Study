//// 심볼 symbol

const sb1 = Symbol()
sonst sb2 = Symbol()
console.log(sb1,sb2)
console.log(sb1 === sb2)

///

const sb1 = Symbol('symbol')
const sb2 = Symbol('symbol')
console.log(sb1, sb2)
console.log(sb1 === sb2)


///

const obj = {a:1}
const sb1 = Symbol(obj)
const sb2 = Symbol(obj)
console.log(sb1, sb2)
console.log(sb1 === sb2)


///


const sb = Symbol(null)
console.log(typeof sb)


///


const NAME = Symbol('이름')
const GENDER = Symbol('성별')
const i = {
[NAME]: 'jinseok',
[GENDER]: 'male',
    age: 25        
}

const i2 = {
[NAME]: 'kim',
[GENDER]: 'male',
    age: 26          
}
const i3 = {
  [NAME]: 'jin',
  [GENDER]: 'male',
  age: 30
}

console.log(i, i2, i3)


///


Object.getOwnPropertySymbols(iu).forEach(k => {
  console.log(k, iu[k])
})

Reflect.ownKeys(iu).forEach(k => {
  console.log(k, iu[k])
})




//// private member



const obj = (() => {
  const _privateMember1 = Symbol('private1')
  const _privateMember2 = Symbol('private1')
  return {
    [_privateMember1]: '외부에서 보이긴 하는데 접근할 방법 X',
    [_privateMember2]: 10,
    publicMember1: 20,
    publicMember2: 30
  }
})()
console.log(obj)
console.log(obj[Symbol('private1')])
console.log(obj[_privateMember1])

for (const prop in obj) {
  console.log(prop, obj[prop])
}

Object.keys(obj).forEach(k => {
  console.log(k, obj[k])
})

Object.getOwnPropertyNames(obj).forEach(k => {
  console.log(k, obj[k])
})

// 물론 아래 방법들로는 접근 가능하나...
Object.getOwnPropertySymbols(obj).forEach(k => {
  console.log(k, obj[k])
})

Reflect.ownKeys(obj).forEach(k => {
  console.log(k, obj[k])
})


/// Symbol.for



const COMMON1 = Symbol.for('공유심볼')
const obj = {
    [COMMON1]: '공유 프로퍼티 키값, 어디서든 접근 가능'
    
}
console.log(obj[COMMON1])

const COMMON2 = Symbol.for('공유심볼')
console.log(obj[COMMON2])


console.log(COMMON1 === COMMON2)

const UNCOMMON = Symbol('비공유심볼')
const commomSymbolkey1 = Symbol.keyFor(COMMON1)
const commomSymbolkey2 = Symbol.keyFor(COMMON2)
const commomSymbolkey2 = Symbol.keyFor(UNCOMMON)


///


const obj = (() => {
    const COMMON1 = Symbol.for('공유심볼')
    return {
        [COMMON1]: '공유할 프로퍼티 키값. 어디서든 접근 가능'
    }
})() //즉시 실행 함수
const COMMON2 = Symbol.for('공유심볼')
console.log(obj[COMMON2])




//// 표준 심볼


const arr = [4, 5, 6]
arr[Symbol.isConcatSpreadable] = true
console.log([1, 2, 3].concat(arr))

arr[Symbol.isConcatSpreadable] = false
console.log([1, 2, 3].concat(arr))


///

class Person {
    constructor (name) { this.name = name}
}
const jin = new Person('jinseok')
console.log(jin.toString())

Person.prototype[Symbol.toStringTag] = 'PERSON'
console.log(jin.toString())





