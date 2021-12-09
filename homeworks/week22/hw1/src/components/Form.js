/* eslint-disable import/no-unresolved */
import styled from 'styled-components'
import { MEDIA_QUERY_LG } from '../constants/breakpoint'

export const Form = styled.form`
  margin-top: 50px;
  width: 645px;
  padding: 100px 56px;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 10px;
  text-align: center;
  
  ${MEDIA_QUERY_LG} {
    width: 400px;
  }
`

export const FormTitle = styled.div`
  font-size: 28px;
  margin-bottom: 28px;  
  font-family: gt-super, Georgia, Cambria, "Times New Roman", Times, serif;
`

export const FormDesc = styled.div`
  font-size: 16px;
  line-height: 36px;
  font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
`

export const FormContentWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const FormInputLabel = styled.label`
  font-size: 13px;
`

export const FormInput = styled.input`
  width: 270px;
  margin: 20px 0;
  padding: 5px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  
  ${MEDIA_QUERY_LG} {
    width: 400px;
  }
`

export const FormButton = styled.button`
  font-size: 14px;
  width: 226px;
  border-color: rgba(25, 25, 25, 1);
  background: rgba(25, 25, 25, 1);
  color: rgba(255, 255, 255, 1);
  padding: 7px 16px 9px;
  margin: 25px;
  border-radius: 99em;
  cursor: pointer;
`

export const ErrorMessage = styled.div`
  color: red;
`

export const PostForm = styled.form`
  margin-top: 50px;
  width: 645px;
  padding: 60px 56px 20px 56px;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 10px;
  font-family: gt-super, Georgia, Cambria, "Times New Roman", Times, serif;
  text-align: center;

`

export const PostTitle = styled.div`
  font-size: 16px;
  text-align: end;
  color: rgba(117,117,117,1);
  font-family: gt-super, Georgia, Cambria, "Times New Roman", Times, serif;
`

export const PostIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
`

export const PostContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PostTitleInput = styled.input`
  width: 80%;
  padding: 8px;
  font-size: 30px;
  margin-bottom: 16px;
  border: none;
  outline: none;
  border-bottom: 1px solid white;

  &:focus {
    border-bottom: 1px solid rgb(209, 209, 209);
    transition: all 0.2s ease-in-out;
  }
`
export const PostTextarea = styled.textarea`
  width: 80%;
  height: 450px;
  resize: none;
  border: none;
  outline: none;

  border-bottom: 1px solid white;
  &:focus {
    border-bottom: 1px solid rgb(209, 209, 209);
    transition: all 0.2s ease-in-out;
  }
`

export const PostButton = styled.button`
  font-size: 14px;
  width: 226px;
  border: none;
  background: #1a8917;
  color: rgba(255, 255, 255, 1);
  padding: 7px 16px 9px;
  margin: 25px;
  border-radius: 99em;
  cursor: pointer;
`
