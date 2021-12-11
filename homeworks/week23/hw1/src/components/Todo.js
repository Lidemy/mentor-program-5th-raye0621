/* eslint-disable import/no-unresolved */
import styled from 'styled-components'

export const TodoItemWrapper = styled.div`
  max-width: 550px;
  border: solid 1px #75ccb9;
  margin: 50px auto;
  padding: 30px 4rem;
  background-color: #fff475;
  border-radius: 5px;
  box-shadow: -1.4px -1.4px 4px 0 #d8eaef;
  border: solid 1px #c7e5ec;
  & input {
    flex: 1;
    padding: 20px;
    border: 1px solid transparent;
    transition: border 300ms ease 0s;
    outline: none;
    height: 0rem;
  }
`

export const TodoTitle = styled.h1`
  text-align: center;
  font-weight: normal;
  font-size: 1.9rem;
`

export const TodoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
`

export const Button = styled.button`
  &:hover {
    background-color: #b3cccc;
    box-shadow: 1.4px 1.4px 4px 0 #b3cccc;
  }

  & + & {
    margin-left: 12px;
  }

  width: 100px;
  padding: 10px 20px;
  font-size: 1rem;    
  border-radius: 3px;
  cursor: pointer;            /* 點擊效果 */
  transition: transform 0.2s;
  border: aliceblue;
`

export const InputButton = styled(Button)`
  background-color: #ffffff;
  margin-left: 12px;
`

export const TodoFilter = styled.div`
  display: flex;
  padding: 12px;
  margin-bottom: 1.5rem;

  &  button {
    width: 100%;
    padding: 10px 20px;
    font-size: 1rem;    
    border-radius: 3px;
    cursor: pointer;            /* 點擊效果 */
    transition: transform 0.2s;
    border: aliceblue;
    background-color: #e5ffff;
  }
`

export const FilterButton = styled(Button)`
`

export const TodoFooter = styled.div`
  text-align: center;
  justify-content: center;
`

export const DeleteAllButton = styled(Button)`
  background-color: #e5ffff;
  margin: 0;
  margin-top: 40px;
  width: 30%;
`
