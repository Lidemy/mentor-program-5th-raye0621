/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import styled from 'styled-components'
import Proptypes from 'prop-types'
import { Link } from 'react-router-dom'

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  margin-bottom:2rem;
  font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: rgba(41, 41, 41, 1);
  & * {
    // outline: 1px solid gold;
  }
`

const PostWrapper = styled.div`
  // width: 75%;
  min-width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
`

const PostTitle = styled(Link)`
  font-weight: 700;
  color: rgba(41, 41, 41, 1);
  text-decoration: none;
  font-size: 22px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const PostBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 0 24px 0;
`

const PostDate = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
`

const ContentText = styled.p`
  font-size: 16px;
  line-height: 24px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`
const PostImgWrapper = styled.div`
  margin-left: 50px;
`

const PostImg = styled(Link)``

const Img = styled.div`
  height: 130px;
  width: 130px;
  background-repeat: no-repeat;
  background-size: cover;

  ${(props) => `
    background-image: url(${props.$ImgRrl});
  `}
`

// P2 新增到最愛
const PostMark = styled.img`
  width: 1rem;
  height: 1rem;
`

export default function Posts({ post }) {
  const randomNum = Math.floor(Math.random() * 50)
  const ImgRrl = `https://picsum.photos/130/130?random=${randomNum}`

  return (
    <PostContainer>
      {/* <PPP> */}
      <PostWrapper>
        <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
        <ContentText>{post.body}</ContentText>
        <PostBottom>
          <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
          {/* <PostMark src="unfavourite.png" /> */}
        </PostBottom>

      </PostWrapper>
      <PostImgWrapper>
        <PostImg to={`/posts/${post.id}`} >
          <Img $ImgRrl={ImgRrl} />
        </PostImg>
      </PostImgWrapper>
      {/* </PPP> */}
    </PostContainer>
  )
}

Posts.propTypes = {
  post: Proptypes.object
}
