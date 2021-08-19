## hw1：Event Loop

在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```


流程圖

!(我應該要是 gif)[https://i.imgur.com/eoSQPyO.gif]

!(我應該要是 gif)[https://github.com/Lidemy/mentor-program-5th-raye0621/blob/week16/homeworks/week16/HW1.gif?raw=true]

[gif 每頁](https://docs.google.com/presentation/d/1uUsxz34jOTUG0HXFa51tt9s_iyK-QUEn/edit?usp=sharing&ouid=109048704341398689294&rtpof=true&sd=true)

### 進入

- main() 在 call stack 中被執行

### 第一步 - 印出 1

- `console.log(1)` 丟進 call stack 的最上方
- 執行後印出 `1`，
- 並且將 `console.log(1)` 從 call stack 拿出來

### 第二步

- 第一個 `setTimeout(...)` 丟進 call stack 的最上方
- 因為 `setTimeout` 並不在 Javascript 的 V8 引擎中，所以將他移到 Web Api 上，請瀏覽器啟動一個 0 毫秒的計時器
- `setTimeout(...)` 在 Web Api 上執行完的話將 `() => { console.log(2) }` 傳到 task queue 中等待 Event loop 來執行他。
- 將 `setTimeout(...)` 交給  Web Api 時，就從 call stack 中拿出來(pop 掉)


### 第三步 - 印出 3

- `console.log(3)` 丟進 call stack 的最上方
- 執行後印出 `3`，
- 並且將 `console.log(3)` 從 call stack 拿出來

### 第四步

- 第二個 `setTimeout(...)` 丟進 call stack 的最上方
- 同第三步解釋，將他移到 Web Api 上，請瀏覽器啟動一個 0 毫秒的計時器
- `setTimeout(...)` 在 Web Api 上執行完的話將 `() => { console.log(4) }` 傳到 task queue 中等待 Event loop 來執行他。
- 將 `setTimeout(...)` 交給  Web Api 時，就從 call stack 中拿出來(pop 掉)

### 第五步 - 印出 5

- `console.log(5)` 丟進 call stack 的最上方
- 執行後印出 `5`，
- 並且將 `console.log(5)` 從 call stack 拿出來

### 第六步 - event loop 參上！ 印出 2

- main() 在 call stack 中執行結束，從 call stack 中移除
- 因為 call stack 現在為空，而 event loop 的任務如下

>event loop 的任務：
查看 call stack (堆疊) 以及 task queue (任務列表)，如果 call stack 是空的，他就會將 task queue 中的第一個 task 堆到 call stack 上面，讓 call stack 可以有效執行。

- 所以 event loop 將 task queue 的第一個 cb `() => { console.log(2) }` 堆到 call stack 上面(會從 task queue 中消失)
- 執行 `() => { console.log(2) }`
- 執行 `console.log(2)`
- 執行後印出 `2`
- `() => { console.log(2) }` 從 call stack 拿出來

### 第七步 - event loop 參上！ 印出 4

- event loop 將 task queue 的第一個 cb `() => { console.log(4) }` 堆到 call stack 上面
- 執行 `() => { console.log(4) }`
- 執行 `console.log(4)`
- 執行後印出 `4`
- `() => { console.log(4) }` 從 call stack 拿出來
- task queue 及 call stack 皆被清空，結束

執行結果
```javascript
1
3
5
2
4
```
---

對於一些用詞覺得不是很準確，感覺自己可能是看懂講者的圖再自己看圖說故事一次而已。

像是第一步，不知道進入後面要接什麼詞，是進入環境？還是進是本程式嗎？還是開始執行程式？ 

關於 `call stack`、`web api`、`task queue` 的解釋可以參考 [milyzoo 同學的作業](https://github.com/Lidemy/mentor-program-4th-milyzoo/blob/master/homeworks/week16/hw1.md)