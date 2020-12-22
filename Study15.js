///Promise

/// Callback Hell

- id가 'btn'인 button을 클릭하면 서버에 users 리스트를 가져오는 요청을 하고,
- 성공하면 list의 세번째 user의 정보를 다시 요청하여
- 성공하면 user의 profileImage url값을 가져다가 image 태그로 표현하고,
- 이 image를 클릭하면 해당 이미지를 제거.


const script= document.createElement('script')
script.src= 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
document.body.appendChild(script)

document.body.innerHTML += '<button id="btn">클릭</button>'
document.getElementById('btn').addEventListener('click', function (e) {
  $.ajax({
    method: 'GET',
    url: 'https://api.github.com/users?since=1000',
    success: function (data) {
      var target = data[2]
      $.ajax({
        method: 'GET',
        url: 'https://api.github.com/user/' + target.id,
        success: function (data) {
          var _id = 'img' + data.id
          document.body.innerHTML += '<img id="' + _id + '" src="' + data.avatar_url + '"/>'
          document.getElementById(_id).addEventListener('click', function (e) {
            this.remove()
          })
        },
        error: function (err) {
          console.error(err)
        }
      })
    },
    error: function (err) {
      console.error(err)
    }
  })
})

/// Promise


document.body.innerHTML = '<button id="btn">클릭</button>'
document.getElementById('btn').addEventListener('click', function (e) {
    fetch('https://api.github.com/users?since=1000')
    .then(function (res) { return res.json() })
    .then(function (res) {
        var target = res[2]
        return fetch('https://api.github.com/user/' + target.id)
    })
    .then(function (res) { return res.json() })
    .then(function (res) {
        var _id = 'img' + res.id
        document.body.innerHTML += '<img id="' + _id + '" src="' + res.avatar_url + '"/>'
        document.getElementById(_id).addEventListener('click', function (e) {
            this.remove()
        })
    })
    .catch(function (err) {
        console.error(err)
    })
})


//// Promise를 반환하면서 JSON parsing을 자동으로 해주는 library (axios) 활용시


const script= document.createElement('script')
script.src= 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js'
document.body.appendChild(script)

document.body.innerHTML += '<button id="btn">클릭</button>'
document.getElementById('btn').addEventListener('click', function (e) {
    axios.get('https://api.github.com/users?since=1000')
    .then(function (res) {
        var target = res.data[2]
        return axios.get('https://api.github.com/user/' + target.id)
    })
    .then(function (res) {
        var _id = 'img' + res.data.id
        document.body.innerHTML += '<img id="' + _id + '" src="' + res.data.avatar_url + '"/>'
        document.getElementById(_id).addEventListener('click', function (e) {
            this.remove()
        })
    })
    .catch(function (err) {
        console.error(err)
    })
})

////Promise Status


const promiseTest = param => new Promise((resolve, reject)=> {
    setTimeout(()=> {
        if(param) {
            resolve("해결")
        } else {
            reject(Eroor("실패"))
        }
    }, 1000)
})
const testRun = param => promiseTest(param)
.then(text => { console.log(text)})
.catch(error => {console.error(error)})

const a = testRun(true)
const b = testRun(false)

///


const executer = (resolve, reject) => {...}
const prom = new Promise(executer)

const onResolve = res => { ... }
const onReject = err => { ... }

prom.then(onResolve, onReject)

prom.then(onResolve).catch(onReject)


////


new Promise((resolve, reject) => { ... })
.then(res => { ... })
.catch(err => { ... })

////


const simplePromiseBuilder = value => {
  return new Promise((resolve, reject) => {
    if(value) { resolve(value) }
    else { reject(value) }
  })
}

simplePromiseBuilder(1)
  .then(res => { console.log(res) })
  .catch(err => { console.error(err) })

simplePromiseBuilder(0)
  .then(res => { console.log(res) })
  .catch(err => { console.error(err) })
```

```js
const simplePromiseBuilder2 = value => {
  return new Promise((resolve, reject) => {
    if(value) { resolve(value) }
    else { reject(value) }
  })
  .then(res => { console.log(res) })
  .catch(err => { console.error(err) })
}

simplePromiseBuilder2(1)
simplePromiseBuilder2(0)
               
               
 ////확장 Promise 만들기
               
               
Promise.resolve(42)
.then(res => { console.log(res) })
.catch(err => { console.error(err) })

Promise.reject(12)
.then(res => { console.log(res) })
.catch(err => { console.error(err) })            
               



////thenable 객체
               
               
 const thenable = {
  then (resolve, reject) {
    resolve(33)
  }
}
const prom = Promise.resolve(thenable)
prom.then(res => { console.log(res) })
               
////
               
const thenable = {
  then (resolve, reject) {
    reject(33)
  }
}
const prom = Promise.resolve(thenable)
prom.catch(err => { console.log(err) })     
               
               
               
/// romise Chaning             
               

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('첫번째 프라미스')
  }, 1000)
}).then(res => {
  console.log(res)
  return '두번째 프라미스'
}).then(res => {
  console.log(res)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
          resolve('세번째 프라미스')
    }, 1000)
  })
}).then(res => {
  console.log(res)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
          reject('네번째 프라미스')
    }, 1000)
  })
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
  return new Error('이 에러는 then에 잡힙니다.')
}).then(res => {
  console.log(res)
  throw new Error('이 에러는 catch에 잡힙니다.')
}).then(res => {
  console.log('출력 안됨')
}).catch(err => {
  console.error(err)
})
               
 ///Error Handling
               
asyncThing1()
.then(asyncThing2)
.then(asyncThing3)
.catch(asyncRecovery1)
.then(asyncThing4, asyncRecovery2)
.catch(err => { console.log("Don't worry about it") })
.then(() => { console.log("All done!") })
               
               
////  Multi Handling
               
///`Promise.all()`

               
const arr = [
	1,
	new Promise((resolve, reject) => {
		setTimeout(()=> {
			resolve('resolved after 1000ms')
		}, 1000)
	}),
	'abc',
	() => 'not called function',
	(() => 'IIFE')()
]

Promise.all(arr)
.then(res => { console.log(res) })
.catch(err => { console.error(err) })
               
////
               
const arr = [
	1,
	new Promise((resolve, reject) => {
		setTimeout(()=> {
			reject('rejected after 1000ms')
		}, 1000)
	}),
	'abc',
	()=> 'not called function',
	(()=> 'IIFE')()
]

Promise.all(arr)
.then(res => { console.log(res) })
.catch(err => { console.error(err) })
               
               
               
               
////`Promise.race()`
               
               
const arr = [
	new Promise(resolve => {
		setTimeout(()=> { resolve('1번요소, 1000ms') }, 1000)
	}),
	new Promise(resolve => {
		setTimeout(()=> { resolve('2번요소, 500ms') }, 500)
	}),
	new Promise(resolve => {
		setTimeout(()=> { resolve('3번요소, 750ms') }, 750)
	})
]
Promise.race(arr)
.then(res => { console.log(res) })
.catch(err => { console.error(err) })
               
               
               
/////
            
               
const arr = [
	new Promise(resolve => {
		setTimeout(()=> { resolve('1번요소, 0ms') }, 0)
	}),
	'no queue'
]
Promise.race(arr)
.then(res => { console.log(res) })
.catch(err => { console.error(err) })
               
               
               
               
               
               
               
               
               
               
               
               
               
               
