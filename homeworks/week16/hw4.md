
## hw4：What is this?

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

在物件的情況下 call this ，可以把 this 轉換成 function call 的形式
以上三個輸出的問題可以轉換成這樣

```javascript
obj.inner.hello()	// 轉換成
obj.inner.hello.call(obj.inner)

obj2.hello()	// 轉換成
obj2.hello.call(obj2)

hello()	// 轉換成
hello.call()
```

`call()` 裡面傳的第一個參數就是 `this` 的值，所以可以一題一題看

### 第一題

- `obj.inner.hello.call(obj.inner)` 

- this 的值為 `obj.inner`，就是整個 inner 物件 ，所以呼叫 `hello()` 當中的 `value` 就在 inner 物件裡面 => `value: 2`

- 印出 `this.value` 就是 `2`

### 第二題

- `obj2.hello.call(obj2)` 

- this 的值為 `obj2`，如上面所宣告 `const obj2 = obj.inner`，所以this 的值也跟第一題一樣是 `obj.inner` ，也是呼叫一樣的 `hello()` ，所以一樣 `value: 2`

- 印出 `this.value` 就是 `2`

### 第三題


- `hello.call()`

- 因為 `call()` 沒有參數傳入，所以可知 this 的值為空，在非物件導向的環境下， this 會根據不同的環境而是不同的值。
	- 在 node.js 環境的話， this 為 `global`
	- 在瀏覽器上的話，this 為 `window`
	- 在嚴格模式下執行(`'use strict'`)，this 為 `undefined`



以上，在嚴格模式下執行的話，最後輸出結果為：
```javascript
2
2
undefined
```


推薦作業：
[milyzoo 同學的作業](https://github.com/Lidemy/mentor-program-4th-milyzoo/blob/master/homeworks/week16/hw4.md)
