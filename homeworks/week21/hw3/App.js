/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React from 'react'
import './form_style.css'
import { useState } from 'react'
import styled from 'styled-components'
import { MEDIA_QUERY_MD } from './breakpoint'

const Form = styled.form`
  border-top: solid 8px #fad312;
  width: 645px;
  height: 1085px;
  margin: 50px auto 70px auto;
  padding: 54px 42px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: white;

  ${MEDIA_QUERY_MD} {
    width: 50%;
  }
`

const ErrMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 0.5rem;
  position: absolute;

  ${(props) => !props.hasError && `
    visibility:hidden;
  `}
`

const Footer = styled.footer`
  width:100%;
  background-color:#000000;
  color:#999999;  
  text-align:center;
  line-height: 60px;
`

function FooterItem() {
  return (
    <Footer>
      © 2020 © Copyright. All rights Reserved.
    </Footer>
  )
}

function FormItem() {
  const [formContent, setFormContent] = useState({
    nickname: '',
    email: '',
    phone: '',
    sign_type: '',
    how_know: ''
  })

  const [noNeedCheckContent, setNoNeedCheckContent] = useState({
    suggest: ''
  })

  const [hasError, setHasError] = useState({
    nickname: false,
    email: false,
    phone: false,
    sign_type: false,
    how_know: false
  })

  const handleChange = (e) => {
    const inputName = e.target.name
    const val = e.target.value
    setFormContent({
      ...formContent,
      [inputName]: val
    })
  }

  const handleNoCheckChange = (e) => {
    const inputName = e.target.name
    const val = e.target.value
    setNoNeedCheckContent({
      ...noNeedCheckContent,
      [inputName]: val
    })
  }

  const handleSubmit = (e) => {
    let isValid = true
    for (const name in formContent) {
      if (!formContent[name]) {
        setHasError((hasError) => ({
          ...hasError,
          [name]: true
        }))
        isValid = false
      } else {
        setHasError((hasError) => ({
          ...hasError,
          [name]: false
        }))
      }
    }

    if (isValid) {
      alert(`
        暱稱：${formContent.nickname}
        信箱：${formContent.email}
        電話：${formContent.phone}
        報名類型：${formContent.sign_type}
        如何得知活動：${formContent.how_know}
        ${noNeedCheckContent.suggest && `對活動的建議：${noNeedCheckContent.suggest}`}
      `)
    }
    e.preventDefault()
  }

  return (
    <Form className="form" onSubmit={handleSubmit} >
      <h1>新拖延運動報名表單</h1>
      <div className="form_block_top">
        <p>活動日期：2021/12/10～2021/12/11</p>
        <p>活動地點：貝克街 221 號 B 座</p>
        <p className="mark_p">* 必填</p>
      </div>

      <div className="form_block required hide_error">
        <label htmlFor="nickname"><h2 className="check_item" check_symbol=" *">暱稱</h2></label>
        <input
          type="text"
          name='nickname'
          placeholder="您的回答"
          id="nickname"
          value={formContent.nickname}
          onChange={handleChange} />
        <ErrMessage hasError={hasError.nickname} >暱稱為必填喲！</ErrMessage>
      </div>

      <div className="form_block required hide_error">
        <label htmlFor="email" ><h2 className="check_item" check_symbol=" *">電子郵件</h2></label>
        <input
          type="email"
          name="email"
          placeholder="您的電子郵件"
          id="email"
          value={formContent.email}
          onChange={handleChange}
          />
        <ErrMessage hasError={hasError.email}>電子郵件為必填喲！</ErrMessage>
      </div>

      <div className="form_block required hide_error">
        <label htmlFor="phone"><h2 className="check_item" check_symbol=" *">手機號碼</h2></label>
        <input
          type="phone"
          name="phone"
          placeholder="您的手機號碼"
          id="phone"
          value={formContent.phone}
          onChange={handleChange} />
        <ErrMessage hasError={hasError.phone} >手機號碼為必填喲！</ErrMessage>
      </div>

      <div className="form_block required hide_error">
        <h2 className="check_item" check_symbol=" *">
          報名類型
        </h2>
        <div className="radio">
          <input
            type="radio"
            value="躺在床上用想像力實作"
            name="sign_type"
            id="on_bed"
            onChange={handleChange} />
          <label htmlFor="on_bed">躺在床上用想像力實作</label>
        </div>
        <div className="radio">
          <input
            type="radio"
            value="趴在地上滑手機找現成的"
            name="sign_type"
            id="on_ground"
            onChange={handleChange} />
          <label htmlFor="on_ground">趴在地上滑手機找現成的</label>
          <ErrMessage hasError={hasError.sign_type} >報名類型為必填喲！</ErrMessage>
        </div>
      </div>

      <div className="form_block required hide_error">
        <label htmlFor="how_know"><h2 className="check_item" check_symbol=" *">怎麼知道這個活動的？</h2></label>
        <input
          type="text"
          name="how_know"
          placeholder="您的回答"
          id="how_know"
          value={formContent.how_know}
          onChange={handleChange} />
        <ErrMessage hasError={hasError.how_know} >怎麼知道這個活動為必填喲！</ErrMessage>
      </div>

      <div className="form_block">
        <label htmlFor="suggest" className="other">
          <h2>其他</h2>
          <p>對活動的一些建議</p>
        </label>
        <input
          type="text"
          name="suggest"
          placeholder="您的回答"
          id="suggest"
          value={noNeedCheckContent.suggest}
          onChange={handleNoCheckChange} />
      </div>
      <input className="button" type="submit" value="提交" />
    </Form>
  )
}

function App() {
  return (
    <>
      <FormItem />
      <FooterItem />
    </>
  )
}

export default App
