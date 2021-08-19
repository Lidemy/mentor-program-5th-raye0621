## hw3：Hoisting
請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

重點：

- hoisting 提升
- Execution Contexts 執行環境 => EC
- Variable Object => VO
- Activation Object => AO
- scope chain

### 進入環境

- 建立 globalEC 並且初始化 VO，會先掃過一遍全部的程式碼，如果有宣告變數或函式等就先在 globalEC 的 Variable Object 中建立此存在，但是「尚未賦值」！

```javascript
globalEC: {
  VO: {
    a: undefined
    fn: function
  }
}
```
- 執行第一行 `var a = 1`
```javascript
globalEC: {
  VO: {
    a: 1
    fn: function
  }
}
```
- 執行第十六行 `fn()` 進入 function fn()

### 進入 fn() 環境

- 建立 fn() 之中的 Execution Contexts，一樣會先掃過一遍 fn() 之中所有的程式碼，如果有宣告變數或函式等就先在 fnEC 的 Activation Object 中建立此存在，但是「尚未賦值」！

```javascript
fnEC: {
  AO: {
    a: undefined
    fn2: function
  }
}

globalEC: {
  VO: {
    a: 1
    fn: function
  }
}
```
- 執行第三行 `console.log(a)`，現在是在 `fn()` 的執行環境中呼叫 `a`，所以會先去 `fnEC` 之中的 `AO` 找，結果為 `a: undefined`，印出 `undefined`

- 執行第四行 `var a = 5`
```javascript
fnEC: {
  AO: {
    a: 5
    fn2: function
  }
}

globalEC: {
  VO: {
    a: 1
    fn: function
  }
}
```
- 執行第五行 `console.log(a)`，同上會先去 `fnEC` 之中的 `AO` 找，結果為 `a: 5`，印出 `5`
- 執行第六行 `a++`
```javascript
fnEC: {
  AO: {
    a: 6
    fn2: function
  }
}

globalEC: {
  VO: {
    a: 1
    fn: function
  }
}
```
- 執行第七行 `var a`，因為 a 已經被宣告且賦值了，這邊在做宣告並無意義。
- 執行第八行 `fn2()`，進入 `fn2`

### 進入 fn2() 環境

- 一樣會先掃過一遍 fn2() 之中所有的程式碼，建立 fn2EC，將宣告的東西放進 AO 中

>因為 `a = 20`、`b = 20` 並沒有宣告符號，所以不列入宣告的東西中

```javascript
fn2EC: {
  AO:{
    // 空
  }
}

fnEC: {
  AO: {
    a: 6
    fn2: function
  }
}

globalEC: {
  VO: {
    a: 1
    fn: function
  }
}
```

- 執行第十一行 `console.log(a)`，現在是在 `fn2()` 的執行環境中呼叫 `a`，所以會先去 `fn2EC` 之中的 `AO` 找，但是找不到，所以會往上一層 `fnEC` 去找，得到 `a: 6`，印出 `6`
- 執行第十二行 `a = 20`，同上往上一層 `fnEC` 去找，找到 `a: 6`，並且重新賦值 `a: 20`

```javascript
fn2EC: {
  AO:{
    // 空
  }
}

fnEC: {
  AO: {
    a: 20
    fn2: function
  }
}

globalEC: {
  VO: {
    a: 1
    fn: function
  }
}
```

- 執行第十三行 `b = 100`，同上往上一層 `fnEC` 去找，但是也找不到，再往上一層 `globalEC` 去找，但是也找不到，都找不到，在 `globalEC` 的 VO 宣告 `b` 並且賦值 `100` 

```javascript
fn2EC: {
  AO:{
    // 空
  }
}

fnEC: {
  AO: {
    a: 20
    fn2: function
  }
}

globalEC: {
  VO: {
    a: 1
    b: 100
    fn: function
  }
}
```

- `fn2()` 執行結束，將 `fn2EC` 移除

```javascript
fnEC: {
  AO: {
    a: 20
    fn2: function
  }
}

globalEC: {
  VO: {
    a: 1
    b: 100
    fn: function
  }
}
```

- 執行第十一行 `console.log(a)`，現在回到 `fn()` 的執行環境中呼叫 `a`，所以一樣在 `fnEC` 之中的 `AO` 找，，得到 `a: 20`，印出 `20`
- `fn()` 執行結束，將 `fnEC` 移除

```javascript
globalEC: {
  VO: {
    a: 1
    b: 100
    fn: function
  }
}
```

- 執行第十七行 `console.log(a)`，現在在 `global` 的執行環境中呼叫 `a`，所以在 `globalEC` 之中的 `VO` 找，，得到 `a: 1`，印出 `1`

- 執行第十八行 `a = 10`，將 `globalEC` `VO` 中的 `a` 賦值為 `10`

```javascript
globalEC: {
  VO: {
    a: 10
    b: 100
    fn: function
  }
}
```

- 執行第十九行 `console.log(a)`，現在在 `global` 的執行環境中呼叫 `a`，所以在 `globalEC` 之中的 `VO` 找，，得到 `a: 10`，印出 `10`

- 執行第二十行 `console.log(b)`，現在在 `global` 的執行環境中呼叫 `b`，所以在 `globalEC` 之中的 `VO` 找，，得到 `b: 100`，印出 `100`

輸出為
```javascript
undefined
5
6
20
1
10
100
```



之後要把 `scope chain` 的部分補上，之後參考

![milyzoo 的作業](https://github.com/Lidemy/mentor-program-4th-milyzoo/blob/master/homeworks/week16/hw3.md)

![yichennnn36 的作業](https://github.com/Lidemy/mentor-program-5th-yichennnn36/blob/master/homeworks/week16/hw3.md)