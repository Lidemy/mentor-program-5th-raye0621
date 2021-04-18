## 跟你朋友介紹 Git
我相信你已經會 command line 才會來跟我說要學 git ，沒錯吧 O.<
1. 下載 [git](https://git-scm.com/downloads) 
2. 使用 command line 到你要放笑話的那個資料夾。
3. 將此資料夾加入版本控制 `git init` 。 
   - 目前只是告訴 git ，這個資料夾要進行版本控制哦，還沒有建立任何版本，檔案也要自己加入進去。
   - 它會在檔案中新增一個`.git`檔案來幫助儲存版本控制的紀錄，所以如果用錯資料夾想要取消的話可以使用`rm -rf .git` 。
4. 如果有不需進行版本控制的檔案( EX: 賽程表)，建立一個檔案並把那些檔案寫進去
    `touch .gitignore` 再 `vim .gitignore` 輸入檔案名稱。
5. 把資料夾裡面所有檔案加入暫存區中 `git add.`。
   - 可以想像 git 中，你對檔案做任何事情(新增、修改、刪除)，它都會把這件「事情」跟檔案放入暫存區，之後等你確定後才可以把暫存區的檔案確立成一個版本。
   - 而一開始什麼版本都沒有的時候當然也要把你版本中所有檔案先加入暫存區。
   - 也可以用`git add <file name>`分別加入暫存區。
6. 將暫存區的檔案建立版本控制`git commit -m <版本描述>`。
   - 將暫存區的檔案放入 repository (儲存庫) 並幫 commit ( 版本 ) 描述，可以描述你這版做了什麼。
   - 建立完版本控制後這就是你的第一個版本，之後如要建立其他版本，在 `git add ` 完之後記得都要做一次這個動作。

7. 關於 git 是如何進行版本控制可以參考下圖
   - localrepo ( local repository 本地端檔案庫)，就是我們最後要的各種版本存放的地方。
   - staging area 就是暫存區，可以想像是一個暫時資料夾，裡面是要放你預期這一版要更改的資料，所以所有修改、或是新增的資料都要再放進來。
   - working directory 就是你在本地端的目錄 
   - 轉換它們：
Directory ➡️ Stating Area： ` git add <file>`
Stating Area ➡️ local repo：  `git commit <file>`
Working Directory ➡️ local repo： `git commit -am "commit message"`

![Git 與 Github 版本控制基本指令與操作入門教學](https://static.coderbridge.com/img/techbridge/images/kdchang/cs101/git-workflow.png)

8. 一些基本功能
   - `git log` 。
   可以看版本控制的歷史紀錄，越新的資訊會在上面，前面那串像亂碼的是版本號。
   - `git checkout + <版本號>`。
   可以切換所在的版本，如果你突然想看最初版的就 `git checkout + <最初版的版本號>` 。
   - `git status`。
   檢視目前狀況，有哪些檔案被改變過跟上一版不一樣。
   - `git diff`。
   檢視目前和上一版相比改了哪些內容。
   
   常用指令
   
|語法|功能|其他|
|----|---|---|
|git init|初始化|在該資料夾開始版本控制，建立一個.git檔案
|git status|看現在狀態|有改變會顯示出來|
|git add <fileName>|將檔案加入版控|預設一次一個 全加入`git add .`|
|git rm --cached <fileName>|將檔案退出版控|預設一次一個
|git commit |新建一個新版本|需再輸入commit message (需要先另外輸入使用者名稱及mail才會讓你繼續)
|git commit -m <commit message>|上面的簡寫法|
|git commit -am <commit message>(推薦) |等於先 git add 再 git commit| (推薦這寫法)只要一行便結束
|git log|看板控的歷史紀錄(現在有哪些版本)|後面可以加 --oneline 會顯示比較簡短|
|git checkout <版本號>|回到某個版本|後面加上 <branch名稱> 回到最新一版
|.gitignore|要忽略的檔案|這也要加入版控中，通常是放和程式無關的檔案(touch 建立完後，用 vi 打開，再輸入無關的檔案)|
|git diff|在 commit 之前，看這次和上次的差別，改了甚麼東西
|rm -rf .git|解決不小心 init 的問題，就是把 `.git` 檔案刪掉|記得到那個資料夾去刪

   
9. 這邊我們來了解分支 branch
   - 為何需要 branch ？
     如果你要多頭進行修改一個版本，或是你的夥伴也要幫助你一起協作，這時候就需要 branch。 
     可以想像它是將你的原版本複製分支出來，大家可以在各個分支上修改東西。
     
     
   - 新增分支 `git branch <branchName>`
     假設現在你想要修改昨天的笑話，剛剛又聽到一個很好笑的笑話想要加入，那這時就可以使用 branch
     現在你有三個分支，一個是原版的主分支；一個是原版修改東西分支；另一個是原版新增東西分支。
     再來只要兩邊的作業都完成，你就可以合併它們。
     
   - 查看目前在哪個分支 `git branch -v`。
   
   - 切換分支 `git checkout <branchName>` ，很熟悉？沒錯，跟切換 commmit 一樣呦。
   
   - 合併分支 merge
     當你分支上的作業都處理結束後就可以準備合併它們了。
     合併前，請注意
     1. 先看清楚自己目前在哪個分支。
     2. 請確保工作目錄是乾淨的，可以用 `git status `確認。
     3. 合併的方式是 ` git merge  <branchName>` ，動作是會將 <branchName> 分支合併過來到你目前所在的分支。
     所以比較常用的會是你回到你的主分支 `git checkout master` 再 ` git merge  <branchName>` 把你做其他修改的分支合併回你的主分支哦。
     4. 合併成功後，你可以利用 git log 查看版本紀錄，你可以發現「合併」的過程會自動建立一個新版本！你也可以使用 `git branch -d <brandName>` 刪除已經合併過，不再需要的分支。
     
   - 衝突 conflict
     假如你一個不小心，把兩個分支修改到相同的東西，那它合併的時候處理如下
     1. 查看狀態 `git status`，看是哪個檔案中衝突了 。
     2. 進入衝突檔 `vim <file>` ，它會跟你說兩個檔案分別改了什麼，你只需留下想保留的內容。
     3. commit 這一版 `git commit -am "描述"` 即可。
     它會再建立一個新版本，所以剛剛衝突的內容都會留著。
10. branch 常用指令
    
|      語法     |      功能       |
|--------------|-----------------|
|git branch  -v|看目前有那些 branch|
|git branch <branchName>|建立新 branch|
|git checkout -b  <branchName>|建立新 branch 並且 checkout 過去|
|git branch  -d <branchName>|刪除branch|
|git checkout <branchName>|切換到指定 branch|跟切換 commmit 一樣|
|git merge <branchName>|把指定 branch 合併進目前的 branch|

11. Github 大家一起協作
    如果蔡哥你想要在不同地方或是跟夥伴遠端一起協作你們的曠世笑話的話，就一定要來了解 github。
    - 什麼是 Github 
    >眾所周知，hub 結尾的地方都可以稱做網路烏托邦。
    而 GitHub 是透過 Git 進行版本控制的軟體原始碼代管服務平台。

    一個讓你在線上實現 git 的網站，我們現在假設一開始有一個最主要的專案放在 remote 端的 github 上面。
    而不管你要加新的功能或是 debug ，相同的概念都是我們要先切出一個 branch ，改完之後再 merge 回 master 上，保持我們專案的穩定性。
    而使用 github 建立分支(branch) 就是要 branch 到我們的本地端，在本地端修改完成後再傳回 remote 端 merge。
    
    - 開始使用 github 
    1. 登入 github 後，按右上角的 `New repository `建立新的專案。
    2. GitHub 遠端與本地端進行串接
    依照上面的提示，到你要上傳的資料夾執行這段

    ```
    git remote add origin https://github.com/raye0621/tesssssst.git
    git branch -M main
    git push -u origin main
    ```
    便可成功串接。(這裡指的 main = 本地端的 master，因為一些原因改名了)
    
    3. push & pull
    可以看成 local repo 跟 remote repo 交流的方式。
    
    `git push origin main` => push 最新的改變 (本機的 main) 到 github 上 (-u 可以省略)。

    `git push origin <branchName>`=> 同理，可以 push 其他 branch 上去。

    如果你人在外地，或是夥伴要和你一起協作，他就需要將在 github 的專案拉到本地端，github 上叫做 pull。

    `git pull origin main` => 把在 github 上面最新的改變 pull 下來 (若有衝突可參考 branch 有衝突的解法)
    
     4. pull requests
        1. 可以在 github上面 merge 兩個 branch。
    `git push origin main` 或是 `git push origin <branchName>` 
    之後 github 上面會顯示 `pull requests`，沒問題的話把 branch merge 回 main。
         2. 而如果出現 conflict (衝突)，處理方式一樣是手動判斷要留下什麼。
        3. 最後記得同步兩端資訊！ 
        再來把 remote 端的 main pull 到 local 端
        `git pull origin main`
        讓 loacal 端的 main 和  remote 端同步，這樣 remote 端及 local 端的資料就同步啦。    
    這樣就可以啦，祝你成為笑話冠軍。

