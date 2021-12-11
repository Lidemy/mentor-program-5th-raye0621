/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import styled from 'styled-components'

import { } from '../../components/About'
import PageTop from '../../components/PageTop'

const AboutWrapper = styled.div`
  display: flex;
`
const AboutTitle = styled.h2`
font-size: 30px;
`
const AboutContent = styled.div`
  // min-width: 80%;
  font-size: 18px;
  line-height: 28px;
  padding-right: 40px;
`
const AboutText = styled.div``
const AboutImgWrapper = styled.div`
  width: 200px;
  height: 200px;
`
const AboutImg = styled.img`
width: 200px;
height: 200px;
`

export default function PostPage() {
  return (
    <>
      <PageTop />

      <AboutTitle>
        關於我
      </AboutTitle>
      <AboutText>
        <AboutContent>
          嗨，你好，我是 Raye！
          在尋找人生方向的旅途中跨入了程式的領域，對工程師無私的分享文化深深著迷，就此踏入了自學程式的旅途，喜歡學習到新事物的自己。
          對自己的期許是能和這個產業一起成長一起進化，未來能夠結合技術能力創造有價值且有趣的產品。
        </AboutContent>
      </AboutText>

      <AboutTitle>
        關於部落格
      </AboutTitle>
      <AboutWrapper>
        <AboutContent>
          本部落格為程式導師計畫第二十二周作業，使用 React 搭配 React Router 實作出的 SPA 部落格，
          版面設計參考接觸程式後熟悉的網站 Medium。
        </AboutContent>
        <AboutImgWrapper>
          <a href="https://bootcamp.lidemy.com/" target="_blank">
            <AboutImg src="https://www.filepicker.io/api/file/a8fY8pGRSbWi2WNX6QIu" />
          </a>
        </AboutImgWrapper>
      </AboutWrapper>
    </>
  )
}
