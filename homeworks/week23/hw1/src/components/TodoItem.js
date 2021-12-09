/* eslint-disable import/no-unresolved */
import styled from 'styled-components'

export const TodoContents = styled.div`
justify-content: center;
`

export const TodoContent = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 3px;

  &:hover {
    background: rgba(216, 210, 141, 0.5);
  }
`

export const TodoContentText = styled.div`
  flex: 1;

  & input {background-color: transparent;}

  ${(props) => props.$isDone && `
    & input {text-decoration: line-through;}
  `}
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
export const StateButton = styled(Button)`
  background-color: #ffccbc;
  ${(props) => props.$isDone && `
    background-color: #dcedc8;  
  `}
`

export const ReButton = styled(Button)`
`
