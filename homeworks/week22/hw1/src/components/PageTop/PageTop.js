/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const TopWrapper = styled.div`
  heigt: 100px;
  margin: 20px 0 30px 0;
  font-weight: 400; 
  font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
`

const PageTopButtonWrap = styled.div`
  display: flex;
  padding: 15px 0 15px 0 ;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
`
const PageTopButton = styled(Link)`
  color: rgba(0, 0, 0, 1);
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  & + & {
    padding-left: 15px;
  }
`

export default function PageTop() {
  return (
    <TopWrapper>
      <h1>Raye's Blog</h1>
      <PageTopButtonWrap>
        <PageTopButton to="/">Home</PageTopButton>
        <PageTopButton to="/about" >about</PageTopButton>
      </PageTopButtonWrap>
    </TopWrapper>
  )
}
