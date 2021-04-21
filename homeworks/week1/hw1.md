## 交作業流程
我專屬的[Github classroom](https://github.com/Lidemy/mentor-program-5th-raye0621)
前置：先用 git clone 抓到本地端

1. **每周交作業都要新開一個 branch**
    - `git checkout -b week_` 
2. 在本地端做完該周的作業 commit 完之後
3. 將檔案同步到 Github 上
    - `git push origin week_`
4. 在 Github 上發 pull request，將 week_ merge 進 master
    - 名稱為周次，可以看到新增/更改了甚麼檔案
    - 可以在這發問
5. 如果 pull request 助教已經改完留下評語但是尚未合併，再本地端改完後再 push 即可
    - 不須再發一次 pull request ，pull request 的本體是 branch
    - 但如果已經合併了，就需要再 pull request (PR)一次
6. **檢查完**複製網址，至學習系統繳交作業
    - 可至作業區檢查有無成功


>注意：可能少 `git add`
>要 檢查 檢查 檢查 檢查


1. merge 完，代表改完作業
2. 本地端同步
    - `git pull origin master`
    - 記得先回到 branch master
3. 刪掉該次作業的 branch，因為已經被合併啦
    `- git branch -d week_`


