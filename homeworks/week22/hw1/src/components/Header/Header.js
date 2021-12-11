/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context'
import { setAuthToken } from '../../utils'
import { MEDIA_QUERY_LG } from '../../constants/breakpoint'

const HeaderContainer = styled.div`
  height: 100vh;
  width: 250px;
  display: flex;
  justify-content: space-between;
  font-family:Microsoft JhengHei;
  flex-direction: column;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  border-right: 1px solid rgba(230, 230, 230, 1);
  
  & * {
    // outline: 1px solid gold;
  }
  
  ${MEDIA_QUERY_LG} {
    width: 100px;
  }
`

const LogoIcon = styled.img`
  width: 45px;
  height: 45px;
  margin-left:10px;
`

const NavbarItem = styled.div`
  padding: 40px 30px;
`
const NavbarIconItem = styled.div`
`

const Nav = styled(Link)`
  display: flex;
  cursor: pointer;
  color: rgba(117, 117, 117, 1);;
  text-decoration: none;
  align-items:center;
  border-left: 2px solid rgba(0, 0, 0, 0);

  & + & {
    margin-top: 40px;
  }

  &:hover {
    border-left: 2px solid rgba(41, 41, 41, 1);
    color: black;
    transition: all 0.2s ease-in-out;
  }

  ${(props) =>
    props.$active && `
      color: black;
      border-left: 2px solid rgba(41, 41, 41, 1););
    `}
`
const NavIcon = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 30px 0 30px;
  opacity: 0.5; 

  &:hover {
    opacity: 1.0; 
    transition: all 0.2s ease-in-out;
  }

  ${(props) =>
    props.$active && `
      opacity: 1.0; 
    `}
`

const NavTitle = styled.div`
  font-size: 16px;
  ${MEDIA_QUERY_LG} {
    display: none;
  }
`

const NavUser = styled.p`
  font-size: 16px;
`

export default function Header() {
  const location = useLocation()
  const { user, setUser } = useContext(AuthContext)
  const history = useHistory()

  const handleLogout = () => {
    setAuthToken('')
    setUser(null)
    if (location.pathname !== '/') {
      history.push('/')
    }
  }

  return (
    <HeaderContainer>
      <NavbarItem>
        <LogoIcon src="BlogLogo.png" />
      </NavbarItem>

      <NavbarIconItem>
        <Nav to="/" $active={location.pathname === '/'} >
          <NavIcon src="HomeLogo.png" />
          <NavTitle>
            Home
          </NavTitle>
        </Nav>

        <Nav to="/about" $active={location.pathname === '/about'} >
          <NavIcon src="AboutLogo.png" />
          <NavTitle>
            About
          </NavTitle>
        </Nav>
        { user &&
          <Nav to="/new-post" $active={location.pathname === '/new-post'} >
            <NavIcon src="PostLogo_G.png" style={{
              color: 'rgba(26, 137, 23, 1)',
              opacity: 1
            }}/>
            <NavTitle style={{ color: 'rgba(26, 137, 23, 1)' }}>
              Write
            </NavTitle>
          </Nav>
        }
        { !user &&
          <Nav to="/register" $active={location.pathname === '/register'} >
            <NavIcon src="RegisterLogo.png" />
            <NavTitle>
              Register
            </NavTitle>
        </Nav> }
        { !user &&
        <Nav to="/login" $active={location.pathname === '/login'} >
          <NavIcon src="LoginLogo.png" />
          <NavTitle>
            Login
          </NavTitle>
        </Nav> }
        { user &&
          <Nav to="/" onClick={handleLogout} >
            <NavIcon src="LogoutLogo.png" />
            <NavTitle>
              Logout
            </NavTitle>
          </Nav> }
      </NavbarIconItem>
      <NavbarItem>
        {user && <NavUser>Hi！{user.nickname}</NavUser>}
        {!user && <NavUser>Hello there.</NavUser>}
      </NavbarItem>
    </HeaderContainer>
  )
}
