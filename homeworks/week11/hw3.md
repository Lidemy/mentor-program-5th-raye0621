## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
>加密可以解密
雜湊不行還原

加密是一對一的關係，並且有著解密的方法。
明文 => 加密 => 密文
密文 => 解密 => 明文

雜湊 Hash 的話是屬於多對一，即使取得雜湊演算法，經過雜湊的密文仍然非常難被推回原始明文。
明文 => hash => 文字

經過雜湊後，連儲存密碼資料的資料庫端都不知道你的原始密碼，只知道經由雜湊後轉換成的密文，就算整個資料庫被整碗端走，駭客也不知道原始密碼。好聰明。



## `include`、`require`、`include_once`、`require_once` 的差別
- require  引入文件的時候，如果碰到錯誤，會給出提示並且「停止」運行下面的程式碼。

語意上來說 require 像是「需要」，我的 PHP 需要引入這些檔案，沒有不行，所以如果錯誤的話會停止。

- include  在引入文件的時候如果碰到錯誤，會給出提示並且「繼續」運行下面的程式碼。

include  就沒有「必須」的意思，所以當 include 失敗 PHP 也不會終止程式。

- require_once

當我們檔案的依賴程度變高，檔案引入來引入去 A 引入 B，B 引入 C，A 又突然引入 C，但 C 在 B 檔案已經被引入過了，造成重複引用的情況。PHP 會重複打開同樣的 C 檔案，把 C 檔案多引入一次，這樣很浪費檔案讀寫的效能。

使用 require_once ，PHP 會檢查目前要 require_once 的檔案是否已經引入，如果沒有才會去執行引入的動作

- include_once

如同前面 require_once 所說，避免檔案重複引入的問題，可以使用 include_once 與 require_once 之間的差異，也如同 require 和 include 之間的差異一樣，include_once 不會停止程式的執行，只會丟出警告訊息。



## 請說明 SQL Injection 的攻擊原理以及防範方法
>惡意構造的 SQL query 注入
又被稱為駭客的填字遊戲

在執行 SQL query 時，原本是將前端給的資料直接帶進 SQL query 中，例如要註冊會員，就將前端給的帳號、密碼等等直接以新增的 SQL query 執行。

而 SQL Injection 的攻擊就是趁我們執行 SQL query 的時候將原本要要給後端的資料換置成其他的 SQL query，和我們本來要執行的 SQL query 結合串接，達到非原本的目的。

例如一個新增留言的 SQL query: 
`"INSERT INTO comments(username, content) VALUES('%s', '%s')"`

原本預期輸入的資料可能長這樣：
username: `Jack`
content: `天氣真好`
一且都沒問題

SQL Injection 的攻擊可能會長這樣：
username: `Jack`
content: `'), ('Rose', '我是豬`
content 那份資料看起來很奇怪，但是一但被我們的 SQL query 執行就會變成這樣
`"INSERT INTO comment(username, content) VALUES('Jack',''), ('Rose', '我是豬')"`

就會多執行一條 Rose 留了 "我是豬" 的留言
偽用了他人的身分留言，好神奇！

- 會發生這個 SQL Injection 問題的原因就是將前端的資料直接給 SQL query 執行

- 解決方法就是將指令轉成字串 
透過 MySQL 或是 PHP 把指令轉成字串，在執行時不把它當作 SQL query 的一部份，而是純粹的資料。



## 請說明 XSS 的攻擊原理以及防範方法
Cross-site Scripting 
簡單的說就是在別人的網站上執行 JavaScript
比如說再留言板輸入 `<script>location.href="https://google.com"</script>`

那網站在顯示留言的時候就會直接把這一行程式碼執行出來，那只要到有顯示這行留言的頁面都會自動被導入到 `https://google.com` 這個位址，超可怕的。

如果特意做一個跟原本頁面一模樣的釣魚網站就中鏢了。

- 會發生這個 XSS 問題的原因就是直接將輸入的東西當作程式碼來運作

- 防範的方式就是針對在 html 上顯示的時候轉成一般字串而非程式碼執行

使用跳脫字元函式，將要顯示在頁面上的任何資料都加上此函式，就不會執行顯示出來的資料。
```php
  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
```


## 請說明 CSRF 的攻擊原理以及防範方法

跨站請求偽造（Cross-site request forgery）
利用 Server 對使用者及瀏覽器的信任，向 Server 執行非本意操作

身分驗證的 bug ：簡單的身分驗證只能保證請求發自某個使用者的瀏覽器，但不能保證請求本身是使用者自願發出。

防範方式：
1. 權杖同步模式(STP)：
當使用者傳送請求時， server 端產生一個 token(保密且唯一)嵌入 HTML 表格，並發給 client 端。使用者提交 HTML 表格時，會將 token 一起傳送到 server 端，並由 server 端驗證。

token 可以任意產生只要確保隨機及唯一性。

這樣可以確保攻擊者傳送請求時由於沒有 token 而失敗。

2. 檢查Referer欄位
在 HTTP header 中有一個 Referer 欄位，這個欄位用以標明 request 來自哪個位址。server 端在處理 request 時應該要注意 Referer 欄位英和請求的位址位於同一個域名下，如果是 CSRF 惡意攻擊的話，Referer 欄位會是包含惡意網址的位址，這時 server 端就可以識別惡意的存取。

3. 瀏覽器本身的防禦機制
設定 SameSite cookie 來管理 cross site request 時 cookie 是否可以一併被帶上，即可簡單解決此一問題。
