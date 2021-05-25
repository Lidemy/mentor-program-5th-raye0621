## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

### `<select></select>`  下拉式選單
   - 屬性：
        `name`：選單名稱
        `size`：預設出現幾個選項
        `id`：選單名稱
   - 搭配使用 `<option></option>` 選單中的選項
      屬性：
        `value`：代表的值
        `selected`: 設定預先選取此選項
        `label`: 說明選項的含義
        `disabled`: 將選項設定為不可選的狀態
   - 也可搭配使用 `<optgroup></optgroup>` 選項分區
      屬性：
        `label`：分區名稱
    舉例：
```html=
<label for="place">選擇出生點</label>
<select name="place" id="place">
    <optgroup label="北部">
      <option value="台北市">台北市</option>
      <option value="新北市">新北市</option>
      <option value="基隆市">基隆市</option>
    </optgroup>
    <optgroup label="南部">
      <option value="高雄市" selected>高雄市</option>
      <option value="台南市">台南市</option>
      <option value="屏東市">屏東市</option>
      <option value="綠島" disabled>綠島</option>
    </optgroup>
</select>
```

### `<del></del>` 標記被刪除的文字
  屬性：
    cite：可以指定一個連結 (URL)，連結解釋該段文字被刪除的原因
    datetime: 標註此修改發生的日期和時間
  
### ` <button></button>` 表單按鈕
  屬性：
   - name: 按鈕名稱
   - type: 按鈕的形式，有三種選項：
   - submit: 表單送出按鈕，預設值
   - reset: 表單內容重置按鈕
   - button: 無功能的按鈕，通常配合 JavaScript 使用
   - value: 當 type="submit" 時，隨表單送出給遠端 server 的值
   - disabled: 禁用此按鈕

參考資料：[Fooish 程式技術](https://www.fooish.com/)


## 請問什麼是盒模型（box modal）

  - box model 盒模型、區塊模型
  CSS 中每一個元素為一個區塊，每一個區塊都有四種屬性如下圖：
  ![BOX](https://codinglead.github.io/images/box-model.png)
    - content：本身的內容區塊。
    - padding：內距，用來設計元素內容與元素本身邊框間的距離。
    - border：邊框，用來包住元素的邊框。可以調整顏色、粗細與樣式。
    - margin：外距，用來設計元素與外部元素的距離。


## 請問 display: inline, block 跟 inline-block 的差別是什麼？

### block  區塊元素
會讓內容從新的一行開始顯示，並盡可能的撐滿容器。
例：div、p、form、header、footer、section 等等
依照排版流最常用到的屬性。


### inline 行內元素
不會影響排列、可以併排，主要用來包住文字段落或對其做處理用；調整 padding 不會對本身跟其他元素做任何影響，一般不會調整，可以調整左右 margin 但是上下調了也沒用。
例：span、a
一般都是需要文字時使用，或是要對特定文字作用時用。


### inline-block 行內的區塊元素
對外表現像行內元素，對內的其他元素表現像區塊元素，不同於 inline，調整 padding margin 後會影響到同階層的其他元素。
可以用此屬性實現文繞圖，但應該使用 float 比較多。


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

### position: static  靜止
  static 是 position 的預設值，作用為「不會被特別定位」，會順著瀏覽器預設的排版流自動排版下來。

### position: relative  相對位置
  不設置其他屬性的話，表現跟 static 一樣，差別是可以多設定其他位置屬性，像是 `top`、`bottom`、`right`、`left`，設置後會使元素相對原本位置調整至設定後的位置，調整後的元素不會影響到其他元素原本的位置。
  - 舉例：需要微調元素位置時可以使用，或是一般子元素需要設定成 position: absolute 時，會先將最接近的父元素設成 position: relative 。

### position: absolute  絕對位置
  一樣是可以調整元素位置，不同的是 absolute 的定位會依照「可以被定位的」上層容器做定位、為基準點。若上層容器沒有任何「可以被定位」的元素的話，那麼這個元素的定位就是 ` body` ，定位在左上角的絕對位置。

  簡單的說就是 absolute 的定位點是往上找到第一個 position 不是 static 的元素。

### position: fixed  固定位置
  會直接相對於瀏覽器視窗做定位，即使頁面捲動，還是會固定在相同的位置，一樣可以設定位置屬性，一般常用在最上面的導覽列或是廣告小視窗上。