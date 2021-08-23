## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

簡單的說一下學了什麼：

1. Javascript 的執行方式 Event Loop
	- Call Stack 堆疊
	- Task Queue 任務列表
	- Event Loop 他只有一個簡單的任務：查看堆疊，並查看任務列表，如果堆疊是空的，他就會將任務列表中的第一個東西堆到堆疊上，讓堆疊可以有效執行。

2. 淺拷貝(Shallow Copy) VS 深度拷貝(Deep Copy)
	- 深拷貝的兩種方法
	- call by value 
	- call by reference (參考)

3. 作用域
4. Hoisting 提升
	- hoisting 優先順序
	- hoisting 的原理
		- Execution Contexts 執行環境 => EC
		- Variable Object => VO
		- Activation Object => AO
		- scope chain

5.  閉包（Closure）
	- 也是跟作用域的觀念有關

6. 物件導向基礎與 prototype
	- new class
	- ES5 如何實作 class，可知 class 做了什麼
	- prototype chain 原型鍊
	- 實作 new 做了什麼
	- 在物件導向中，用來指向 call 這個 function 的 instance
	- this 只有在物件導向的環境下才有意義，才其他的環境下呼叫 this 基本上是沒什麼意義的
	- call 與 apply
	- 小技巧判斷 this 的值，轉換成 function call 的形式
	- 強制綁定 this：bind
	- 特例 arrow function 的 this



無庸置疑的是老師的文章真的寫得很讚，架構完整、脈絡有條理，舉的例子也都清楚易懂，只是吸收可能還是需要時間，因為我是初碰這些東西，所以不向老師或是產文章的前輩們是因為用了一段時間、或是被一些問題困擾過、亦或是抱著錯誤觀念走了很久突然看到別人文章提到而恍然大悟。

等等總之就是原本已經認識它了，只是可以藉由大家一起研究釐清，把更深層它原本不明顯的脈絡挖出來展現給大家看

但我目前的功力只等於是只知道這個已經被挖出來的它，所以印象點可能不會那麼深刻，也沒有清深體會過之前的人們遇到什麼問題

但是這周的知識學完後感覺自己如果以後遇到了，至少會知道要去哪邊、該往哪個方向找答案，就算記憶差勁如我，這周已經學過一次成因脈絡至少有建立基本的觀念，期許自己未來可以搞得更清楚。
