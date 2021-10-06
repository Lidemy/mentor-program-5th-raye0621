## 為什麼我們需要 React？可以不用嗎？

React 經由兩個核心概念 `state` 與 `component` 使我們建立的 APP 的維護性和可重用性都大大提升。

在過往我們透過 Javascript 或是他的 Library jQuery 操作 DOM 等功能來開發網頁，過往在開發上通常要花很多時間在處理及操作 DOM 元素，當資料改變後，也要相對應的將資料的改變透過程式呈現在頁面上，隨著開發規模的擴大，這麼做容易造成不必要的資料更新，使得效能降低，且在維護時的難度也會提升， React 的出現就是為了解決這些問題。

### 可以不用 React 嗎？ 與 Virtual DOM 
>當然可以不用，就像人生一樣大家都有不同的選擇

可以不用 React ，有時候不用 React 效能上可能還會更好，但是換來的可能就是不好維護性和難以擴充性
以刪除 Todo 功能來舉例，傳統我們的刪除的方式就是針對畫面上的這個地方直接操作 DOM 去刪除，

但是以 React 來說，我們是改變了 `state` 中的 todoList 資料，再由 React Library 中建立的 Virtual DOM 來判斷新舊資料 render 出來的 Virtual DOM 有哪邊是不一樣的部分，並且 「只」 更新該部分，而不是整個畫面重新 render。

但是在專案規模一大，直接操作 DOM 的方式可能會變得很肥大且不好維護，這時候我們就可以依賴 React 這個 Library，雖然效能不如直接操作 DOM 好，但是會比全部重新 render 快許多，算是一個非常好的折衷解法。

還有一個優點是 React 現在的生態在有了 hooks 之後趨向成熟，網路上各個網友分享的 hooks 百家爭鳴，想要什麼功能幾乎都找的到別人是怎麼寫的，很多時候有別人造好輪子也是一件不錯的事情。

## React 的思考模式跟以前的思考模式有什麼不一樣？

### 只須關注資料的改變 - state

原本的思考模式，資料與畫面是完全分離的，資料歸資料，我們會寫專門處理資料的檔案，在操作畫面上也是直接操作 DOM。

假如我們要做一個新增 Todo 的事件，就會寫一個方法去改變資料，在寫一個方法操作畫面上的 DOM 已做出新增 Todo 後的畫面，對資料跟畫面的處理完全是兩件事情。
![](https://i.imgur.com/O0R3tnl.png)

有了 React 之後，我們的思考模式變成畫面跟資料是連動在一起的，畫面永遠都是透過資料產生，我們只要關注資料的變動，以及最後操作上只要操作資料就可以了，這樣也能保證資料畫面永遠一致。
![](https://i.imgur.com/IbZ0TMa.png)

而在 React 中用來管理資料狀態的東西叫做 state，所以也可以說畫面永遠由 state 產生，state 長怎樣，UI 就會長怎樣。

### 將所有東西模組化 - component

React 將所有東西都模組化，每一個區塊都可以切成一個個小元件 - 「component」，這些被切好的小元件可以在專案的各處重複使用，就想是寫好的 function 可以在不同地方重複使用一樣，只是把它想成是一塊一塊像拼圖一樣的小元件可以組合使用，可以在各自組成一個更大的元件。

每一個小元件 component，其實怎麼切都可以，重點是要考慮到重用性，一個小至 `button` 、中至一個 `navbar`、大至一個 `wrapper` 都可以被叫做一個 component，這些 component 中也可以是由更小的 component 組成。

![](https://i.imgur.com/8AZXtyn.png)

## state 跟 props 的差別在哪裡？

props 是 component 之間父子之間溝通的橋樑

state 是 React 用來儲存資料的狀態，通常只要 state 改變畫面就會跟著改變

### props (properties )

使用起來用以前的思維來說就像是 function 傳入的參數一樣，只是這邊的 function 其實就是我們一個一個的組件 component。

### state 

React 的精隨，前面有說到在 React 中資料跟畫面是連動的，我們只要關注資料是如何改變即可，而要儲存、改變資料就是由 `state` 去儲存、 `setState` 去改變。

參考資料

[麥克的半路出家筆記 - [筆記] Why React?](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-why-react-424f2abaf9a2)

[Allen 的作業](https://github.com/Lidemy/mentor-program-5th-rockyooooooo/blob/master/homeworks/week21/hw4.md)
[Benben 的作業](https://github.com/Lidemy/mentor-program-5th-benben6515/blob/master/homeworks/week21/hw4.md)
