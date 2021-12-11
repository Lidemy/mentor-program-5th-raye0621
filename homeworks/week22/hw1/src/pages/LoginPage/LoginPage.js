/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { login, getMe } from '../../WebAPI'
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

export default function LoginPage() {
  const { setUser } = useContext(AuthContext)
  const [username, setUsername] = useState('raye')
  const [password, setPassword] = useState('Lidemy')
  const [errorMessage, setErrorMessage] = useState()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage(null)

    login(username, password).then((data) => {
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
      })
    })
  }

  return (
    <Form onSubmit={handleSubmit}>

      <FormTitle>Sign in with Account</FormTitle>
      <FormDesc>Enter the account and password! </FormDesc>
      <FormContentWrapper>

        <FormInputLabel htmlFor="username">
          Your account!
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
