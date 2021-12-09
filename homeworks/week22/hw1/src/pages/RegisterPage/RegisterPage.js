/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { register, getMe } from '../../WebAPI'
import { setAuthToken } from '../../utils'
import { AuthContext } from '../../context'
import {
  Form,
  FormTitle,
  FormDesc,
  FormContentWrapper,
  FormInputLabel,
  FormInput,
  FormButton,
  ErrorMessage
} from '../../components/Form.js'

export default function RegisterPage() {
  const { user, setUser } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const password = 'Lidemy'
  const [errorMessage, setErrorMessage] = useState()
  const history = useHistory()

  useEffect(() => {
    if (user) {
      history.push('/')
    }
  }, [history, user])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage(null)
    register(username, password, nickname).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message)
      }
      setAuthToken(data.token)
      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null)
          return setErrorMessage(response.toString())
        }
        setUser(response.data)
        history.push('/')
      }).catch((err) => setErrorMessage(err.message))
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Register a test Account</FormTitle>
      <FormDesc>Enter the your nickname and username.</FormDesc>
      <FormDesc>
        For testing, the password is set as default value 'Lidemy'!
      </FormDesc>
      <FormContentWrapper>

        <FormInputLabel htmlFor="nickname">
          Your nickname!
        </FormInputLabel>
        <FormInput
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <FormInputLabel htmlFor="username">
          Your username!
        </FormInputLabel>
        <FormInput
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormInputLabel htmlFor="password">
          Your password!
        </FormInputLabel>
        <FormInput
          id="password"
          value={password} type="password"
        />

        <FormButton type="submit">Continue</FormButton>
      </FormContentWrapper>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  )
}
