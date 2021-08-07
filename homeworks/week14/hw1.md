## hw1：短網址系統設計
短網址設計真的是莫明其秒卡了好幾天的東西 XD

對於沒有正確答案的事情我會有個壞習慣是一直拖延

>以下偷偷搬運寫在進度報告的東西

總之是用自己理解的方式畫出來了，雖然還是無法完全搞懂到底是再做甚麼，參考了同學的作業真的是十個人有十種畫法，網路上的短網址設計也是、每位筆者著重的點也都不一樣，有些著重在規劃流量大小、以正確地建立起合適效能的資料庫(說法好像不準確)；有些則是著重在建立流程而對於資料庫要存哪個就比較沒有著墨

有些是著重在短網址應該如何生成的演算法；而有些好像是考慮的很周密、連要建立回傳的短網址都可以先建立起來存到預先準備的資料庫中，需要建立時就直接抽一個出來用，省去建立 hash 等演算法的時間

真的是要研究的話可以研究好多，所以就謝天吧，不是

要研究的太多了，要深究的話可能要等功力強一些會比較有感，這應該很適合當 senior 的面試考題...嗎

不過現階段知道有這些流程我覺得還不錯，就像是建築系學習畫簡單的平立剖圖後再讓你看業界工程圖上龍飛鳳舞之後，你就會知道學校不可能把全部的眉眉角角都教給你，很多拼圖是要去實際用到的地方才會學會。

而且原來資料庫是需要那麼多個的東西，可以有主要資料庫、快取資料庫、建立資料用資料庫等等，這些資料庫不知道是都建立在一台主機下面還是一台主機分很多資料庫出去。

![](https://i.imgur.com/sheEkva.jpg)

參考資料：
[jyt0532's Blog 系統設計 - 設計縮網址服務](https://www.jyt0532.com/2019/12/05/design-tiny-url/)

[短网址(short URL)系统的原理及其实现](https://hufangyun.com/2017/short-url/)

[Allen 同學](https://github.com/Lidemy/mentor-program-5th-rockyooooooo/blob/master/homeworks/week14/hw1/hw1.md)

[yichen 同學](https://github.com/Lidemy/mentor-program-5th-yichennnn36/blob/master/homeworks/week14/hw1.md)

[Lindsay 同學](https://raw.githubusercontent.com/Lidemy/mentor-program-5th-Lindsay0214/master/homeworks/week14/hw1/IMG_3057.JPG)

[Jason 同學](https://github.com/Lidemy/mentor-program-5th-Jason-lin80826/blob/master/homeworks/week14/hw1.md)