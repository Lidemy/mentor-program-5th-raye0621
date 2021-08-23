## hw2：Event Loop + Scope
請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript=
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

### 進入迴圈

- 執行迴圈，for 迴圈放入 call stack
- 宣告全域變數 `var i=0`，判斷 `i<5`，是，進入第一圈迴圈

### 第一圈

- 執行第二行， `console.log('i: ' + i)` 此時在 call stack 最上面
- 執行 `console.log('i: ' + i)` ，此時 `i=0` ，印出 `i: 0`
- `console.log('i: ' + 0)` 從 call stack 上移除

- 執行第三行，因為 `setTimeout(...)` 不在 Javascript 的 V8 引擎中，所以將他移到 Web Api 上，請瀏覽器啟動一個 `i * 1000` 毫秒的計時器，此時 `i=0` ，所以計時器為 `0` 毫秒
- `setTimeout(...)` 在 Web Api 上執行完的話將 `() => { console.log(i) }` 傳到 task queue 中等待 Event loop 來執行他。
- 將 `setTimeout(...)` 交給  Web Api 時，就從 call stack 上移除
- 第一圈迴圈執行結束。回到第一行，`i++`，此時 `i=1`，判斷 `i<5`，是，進入第二圈迴圈

### 第二圈

- 執行第二行， `console.log('i: ' + i)` 此時在 call stack 最上面
- 執行 `console.log('i: ' + i)` ，此時 `i=1` ，印出 `i: 1`
- `console.log('i: ' + 1)` 從 call stack 上移除

- 執行第三行，因為 `setTimeout(...)` 不在 Javascript 的 V8 引擎中，所以將他移到 Web Api 上，請瀏覽器啟動一個 `i * 1000` 毫秒的計時器，此時 `i=1` ，所以計時器為 `1000` 毫秒
- `setTimeout(...)` 在 Web Api 上執行完的話將 `() => { console.log(i) }` 傳到 task queue 中等待 Event loop 來執行他。
- 將 `setTimeout(...)` 交給  Web Api 時，就從 call stack 上移除
- 第一圈迴圈執行結束。回到第一行，`i++`，此時 `i=2`，判斷 `i<5`，是，進入第三圈迴圈

### 第三圈

- 執行第二行， `console.log('i: ' + i)` 此時在 call stack 最上面
- 執行 `console.log('i: ' + i)` ，此時 `i=2` ，印出 `i: 2`
- `console.log('i: ' + 2)` 從 call stack 上移除

- 執行第三行，因為 `setTimeout(...)` 不在 Javascript 的 V8 引擎中，所以將他移到 Web Api 上，請瀏覽器啟動一個 `i * 1000` 毫秒的計時器，此時 `i=2` ，所以計時器為 `2000` 毫秒
- `setTimeout(...)` 在 Web Api 上執行完的話將 `() => { console.log(i) }` 傳到 task queue 中等待 Event loop 來執行他。
- 將 `setTimeout(...)` 交給  Web Api 時，就從 call stack 上移除
- 第一圈迴圈執行結束。回到第一行，`i++`，此時 `i=3`，判斷 `i<5`，是，進入第四圈迴圈

### 第四圈

- 執行第二行， `console.log('i: ' + i)` 此時在 call stack 最上面
- 執行 `console.log('i: ' + i)` ，此時 `i=3` ，印出 `i: 3`
- `console.log('i: ' + 3)` 從 call stack 上移除

- 執行第三行，因為 `setTimeout(...)` 不在 Javascript 的 V8 引擎中，所以將他移到 Web Api 上，請瀏覽器啟動一個 `i * 1000` 毫秒的計時器，此時 `i=3` ，所以計時器為 `3000` 毫秒
- `setTimeout(...)` 在 Web Api 上執行完的話將 `() => { console.log(i) }` 傳到 task queue 中等待 Event loop 來執行他。
- 將 `setTimeout(...)` 交給  Web Api 時，就從 call stack 上移除
- 第一圈迴圈執行結束。回到第一行，`i++`，此時 `i=4`，判斷 `i<5`，是，進入第五圈迴圈


### 第五圈

- 執行第二行， `console.log('i: ' + i)` 此時在 call stack 最上面
- 執行 `console.log('i: ' + i)` ，此時 `i=4` ，印出 `i: 4`
- `console.log('i: ' + 4)` 從 call stack 上移除

- 執行第三行，因為 `setTimeout(...)` 不在 Javascript 的 V8 引擎中，所以將他移到 Web Api 上，請瀏覽器啟動一個 `i * 1000` 毫秒的計時器，此時 `i=4` ，所以計時器為 `4000` 毫秒
- `setTimeout(...)` 在 Web Api 上執行完的話將 `() => { console.log(i) }` 傳到 task queue 中等待 Event loop 來執行他。
- 將 `setTimeout(...)` 交給  Web Api 時，就從 call stack 上移除
- 第一圈迴圈執行結束。回到第一行，`i++`，此時 `i=5`，判斷 `i<5`，否！跳出迴圈
- for 迴圈執行結束，從 call stack 移除

### Event loop 參上！

>call stack 目前為空並且由 Event loop 監測到，Event loop 開始將 task queue 中等待的 cb 們依照移入的順序移至 call stack 中執行，目前 task queue 內有 5 個任務在等待

- Event loop 將 task queue 的第一個 cb `() => { console.log(i) }` 堆到 call stack 上面(會從 task queue 中消失)
- 執行 `() => { console.log(i) }` ，此時 `i=5`，印出 `i: 5`
- `() => { console.log(i) }` 從 call stack 上移除

- 等待 `1000` 毫秒，Event loop 將 task queue 的第一個 cb `() => { console.log(i) }` 堆到 call stack 上面(會從 task queue 中消失)
- 執行 `() => { console.log(i) }` ，此時 `i=5`，印出 `i: 5`
- `() => { console.log(i) }` 從 call stack 上移除

- 再等待 `1000` 毫秒，Event loop 將 task queue 的第一個 cb `() => { console.log(i) }` 堆到 call stack 上面(會從 task queue 中消失)
- 執行 `() => { console.log(i) }` ，此時 `i=5`，印出 `i: 5`
- `() => { console.log(i) }` 從 call stack 上移除

- 再等待 `1000` 毫秒，Event loop 將 task queue 的第一個 cb `() => { console.log(i) }` 堆到 call stack 上面(會從 task queue 中消失)
- 執行 `() => { console.log(i) }` ，此時 `i=5`，印出 `i: 5`
- `() => { console.log(i) }` 從 call stack 上移除

- 再等待 `1000` 毫秒，Event loop 將 task queue 的第一個 cb `() => { console.log(i) }` 堆到 call stack 上面(會從 task queue 中消失)
- 執行 `() => { console.log(i) }` ，此時 `i=5`，印出 `i: 5`
- `() => { console.log(i) }` 從 call stack 上移除

- task queue 及 call stack 皆被清空，結束

輸出結果：

輸出前五行的時候基本上速度很快，看起來會一起印出，後面的 5 個 `5`則會間隔 `1000` 毫秒一個一個輸出。
```javascript=
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```