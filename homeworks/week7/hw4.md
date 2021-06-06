## 什麼是 DOM？
英文 Document Object Model 文件物件模型
- 將 HTML 裡面的標籤標記等所有東西轉換成 Javascript 可以改變的物件。
- 瀏覽器提供 DOM 這個橋梁，讓我們可以使用 Javascript 對瀏覽器作用，改變畫面或是增添功能等等。
- Javascript 透過 DOM 提供的 API 來對 HTML 做存取及操作。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
![](https://static.coderbridge.com/img/techbridge/images/huli/event/eventflow.png)
事件傳遞機制的順序為先捕獲，再冒泡。
對一個元素(target)作用時，事件傳遞機制會從該元素的根元素開始傳遞事件，傳到該元素後再傳回去根元素，
- 此過程中從根元素傳到此元素(target)的過程叫做 Capture Phase 捕獲
- 從此元素(target)傳到根元素的過程叫做 Bubbling Phase 冒泡
- 但是當事件傳到該元素(target)本身時沒有分捕獲或是冒泡


## 什麼是 event delegation，為什麼我們需要它？
event delegation 事件代理人

想像一下，如果要讓每一個按鈕按下去都跳出一個 alert，那就必須在按鈕上新增一個監聽器 eventListener，那 100 個按鈕就要加 100 次 eventListener 嗎？

NO！太沒效率了，用捕獲跟冒泡來想，每一個按鈕都會由最上層開始捕獲以及冒泡到上層，
那就在上一層，也就是包住這 100 個按鈕的那一層加上 enentListener 就好了，由它來處理這 100 個按鈕。

那一層的名字叫做 事件代理人 event delegation

除了這個好處外，如果要處理動態新增的事件也需要使用到事件代理人。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
- `event.preventDefault()` 取消觸發預設行為，例如 a (跳轉網頁或跳到hash), form (提交行為) 的行為
- `event.stopPropagation()` 停止事件繼續冒泡傳遞，停止在捕獲行為。
取消事件往後傳遞冒泡，類似像是在 function 中加入 return 中止函式，讓後續的程式碼不會繼續執行
