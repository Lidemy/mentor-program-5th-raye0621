## Webpack 是做什麼用的？可以不用它嗎？

### webpack 簡介：
一個打包工具，可以把多個模組打包起來變成 JavaScript 檔，來讓瀏覽器可以使用

概念： 
(根據 [webpack 簡中文件](https://webpack.docschina.org/concepts/))

```language
本質上，webpack 是一個用於現代 JavaScript 應用程序的「靜態模組打包工具」。
當 webpack 打包處理應用程序時，它會在內部構建一個 dependency graph (依賴圖)。
此依賴圖對應到項目所需的每一個模組，並且產生一個或多個 bundle。
```

webpack 就是幫我們將做一堆各做各事的模組全部整合打包變成一個 JavaScript 檔案，瀏覽器只需引入這個 JavaScript 檔，便可執行我們裡面包住的各種功能。

例如本周作業便是將留言版功能用 webpack 打包起來生成一個 JavaScript 檔，而我們的主頁面只要簡單的輸入參數便可以輕鬆愜意的引入我們做好的留言板並且使用。

### 可以不用嗎？

如果不使用 webpack 的話，我們必須把每一個 JavaScript 檔案各自引入到 HTML 檔中。

以本周作業為例的話就是可能要多引入 `api.js`、`utils.js`、`style.css`、`main.js` 等等多個檔案，留言版功能才能完整，這樣假如這是要給他人使用的話也很不方便。

而用 webpack 打包的話，就可以將那些分散的 JavaScript 檔案全部包成一個 `main.js` ，這個檔案中就包含了前面所有的功能，並且讓使用上更加直覺方便。


[webpack 簡中文件](https://webpack.docschina.org/concepts/)
[同學的作業 - Allen 寫得真好](https://github.com/Lidemy/mentor-program-5th-rockyooooooo/blob/master/homeworks/week13/hw4.md)
## gulp 跟 webpack 有什麼不一樣？
gulp 跟 webpack 做的事情有些是差不多的，但是在「定位」上是完全不同的

### gulp
gulp 主要是用在管理各式任務 (task)，定位上就是一個任務管理者 (task manerger)

### webpack 
webpack 則是打包很多我們所需要的東西，打包前須要先 loader ，將資源載入到 webpack 之中，webpack 再進行打包。

而在載入的過程中就可以做一些事情，例如說 babel scss 等等許多好像 gulp 再做的事情，這也是為甚麼 webpack 與 gulp 會被拿來一起討論的原因。

但是這邊 webpack 在做的事情還是在把各種模組 bundle (打包)，而非一項一項的任務 (task)。

### 小結
只要清楚他們兩個的定位完全不同，就可以知道他們是拿來做不同事情的。

webpack 的重點是 bundle (打包)，本身的定位功能並不是執行各式各樣的 task (任務)。

gulp 的重點是 task (任務)，它幾乎所有事情都可以做到。

### 備註
關於 gulp 也可以有個 task (任務) 是 bundle(打包)，但這不是它的定位所在。


## CSS Selector 權重的計算方式為何？
CSS Selector 權重可以靠以下的優先度級別來比較，如果優先度一樣就靠加權比較。

優先度級別由高至低

inline style > ID > Class > Element > * 

- 我直接在你行內寫 style 
inline style (1, 0, 0, 0) 
```language
<div style="itsme"></div>
```

- id 選擇器 
ID (0, 1, 0, 0)
```language
<div id="itsme"></div>
```

- 屬性選擇器 偽裝元素
Class (0, 0, 1, 0)
```language
<div class="itsme"></div>
```

- 類別選擇器
Element (0, 0, 0, 1)
```html
div, p, ul, ol, li, em, header, footer, article....
```

- 全域選擇器
`*` (0, 0, 0, 0)
```language
* {
  margin: 10px;
}
```

- 依據被以上各個選擇器選擇到的次數做加權，最大值才會被顯示。

### 規格外
- 最大權重 !important
`!important` (1, 0, 0, 0, 0)
```language
.box{
    background-color: #f00;!important
}
```
因為會覆蓋掉其他所有選擇器，所以盡量少使用。
只有 `!important` 能覆蓋 `!important`

[小事之 CSS 權重 (css specificity)](https://ithelp.ithome.com.tw/articles/10196454)
[MDN - 優先級](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)