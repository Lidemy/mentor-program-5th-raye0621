/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context'
import { postPage } from '../../WebAPI'
import {
  PostForm,
  PostTitle,
  PostContentWrapper,
  PostButton,
  ErrorMessage,
  PostTitleInput,
  PostTextarea,
  PostIcon
} from '../../components/Form.js'

export default function PostPage() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useContext(AuthContext)

  // 沒登入休想進來
  useEffect(() => {
    if (!user) {
      history.push('/')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLoading) return

    if (!user) {
      return console.log('login?')
    }

    setIsLoading(true)
    setErrorMessage(null)
    postPage(title, body).then((response) => {
      setIsLoading(false)
      if (response.ok === 0) {
        return setErrorMessage(response.message)
      }
      history.push('/')
    })
      .catch((err) => {
        setIsLoading(false)
        return setErrorMessage(err.message)
      })
  }

  return (
    <PostForm onSubmit={handleSubmit}>
      <PostTitle>
        <PostIcon src="PostLogo.png" />
        Leave some trace.
      </PostTitle>
      <PostContentWrapper>

        <PostTitleInput
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=' Title'
        />

        <PostTextarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder=' Tell your story...'
        />

        <PostButton type="submit">Publish</PostButton>
      </PostContentWrapper>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </PostForm>
  )
}
