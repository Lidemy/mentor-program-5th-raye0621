/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Header from '../Header'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'
import HomePage from '../../pages/HomePage'
import SinglePage from '../../pages/SinglePage'
import PostsPage from '../../pages/PostsPage'
import AboutPage from '../../pages/AboutPage'
import { AuthContext } from '../../context'
import { getMe } from '../../WebAPI'
import { getAuthToken } from '../../utils'
// import { MEDIA_QUERY_MD, MEDIA_QUERY_LG } from '../../constants/breakpoint'

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  & * {
    // outline: 1px solid gold;
  }
  // margin: 0 auto;
`

const PageContainer = styled.div`
  padding: 20px 100px 0 100px;
  width: 50%;
`

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const hasToken = getAuthToken()
    if (!hasToken) return

    getMe().then((response) => {
      if (response.ok) {
        console.log(response.data)
        setUser(response.data)
      } else {
        console.log('App.js 錯誤')
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      setUser
    }}>
      <Router>
        <MainContainer>
          <Header />
          <PageContainer>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/posts/:id">
                <SinglePage />
              </Route>
              <Route path="/new-post">
                <PostsPage />
              </Route>
              <Route path="/about">
                <AboutPage />
              </Route>
            </Switch>
          </PageContainer>
        </MainContainer>
      </Router>
    </AuthContext.Provider>
  )
}
