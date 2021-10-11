/* eslint-disable quote-props */
/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import styled from 'styled-components'
import { useState, useRef } from 'react'

const Button = styled.button`
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
  cursor: pointer; 
  transition: transform 0.2s;
  border: aliceblue;
`

const TodoItemWrapper = styled.div`
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

const TodoTitle = styled.h1`
  text-align: center;
  font-weight: normal;
  font-size: 1.9rem;
`

const TodoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
`

const TodoFilter = styled.div`
  display: flex;
  padding: 12px;
  margin-bottom: 1.5rem;

  &  button {
    width: 100%;
    padding: 10px 20px;
    font-size: 1rem;    
    border-radius: 3px;
    cursor: pointer;
    transition: transform 0.2s;
    border: aliceblue;
    background-color: #e5ffff;
  }
`

const FilterButton = styled(Button)`
`

const TodoContents = styled.div`
  justify-content: center;
`
const TodoContent = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 3px;

  &:hover {
    background: rgba(216, 210, 141, 0.5);
  }
`

const TodoContentText = styled.div`
  flex: 1;

  & input {background-color: transparent;}

  ${props => props.$isDone && `
    & input {text-decoration: line-through;}
  `}
`

const TodoFooter = styled.div`
  text-align: center;
  justify-content: center;
`

const InputButton = styled(Button)`
  background-color: #ffffff;
  margin-left: 12px;
`

const StateButton = styled(Button)`
  background-color: #ffccbc;
${props => props.$isDone && `
  background-color: #dcedc8;  
`}
`

const ReButton = styled(Button)`
`

const DeleteAllButton = styled(Button)`
  background-color: #e5ffff;
  margin: 0;
  margin-top: 40px;
  width: 30%;
`

function Todo({ todo, handleDeleteTodo, handleToggleClick, handleEditTodo, handleOnblur }) {
  const handleToggleIsDone = () => {
    handleToggleClick(todo.id)
  }

  return (
    <TodoContents data-todo-id={todo.id}>
      <TodoContent>
        <TodoContentText $isDone={todo.isDone} >
          <input defaultValue={todo.content} onChange={handleEditTodo}
            onBlur={() => {
              handleOnblur(todo.id)
            }} />
        </TodoContentText>
        <StateButton $isDone={todo.isDone} onClick={handleToggleIsDone}>
          {todo.isDone ? '已完成' : '未完成'}
        </StateButton>
        <ReButton onClick={() => {
          handleDeleteTodo(todo.id)
        }}>刪除</ReButton>
      </TodoContent>
    </TodoContents>
  )
}

function TodoItem() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      content: '第一則留言已完成',
      isDone: true
    },
    {
      id: 2,
      content: '第二則留言未完成',
      isDone: false
    },
    {
      id: 3,
      content: '第三則留言已完成',
      isDone: true
    }
  ])
  const [value, setValue] = useState('')
  const [filters, setFilter] = useState('All')
  const [edit, setEdit] = useState('')
  const id = useRef(4)

  const FILTER_KEY = {
    'All': todo => todo,
    'UnDone': todo => todo.isDone === false,
    'Done': todo => todo.isDone === true
  }

  const handleButtonClick = () => {
    if (!value.trim()) return
    setTodos([{
      id: id.current,
      content: value
    }, ...todos])
    setValue('')
    id.current++
  }

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleToggleClick = id => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        isDone: !todo.isDone
      }
    }))
  }

  const handleDeleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleDeleteAllTodo = () => {
    setTodos([])
  }

  const handleOnblur = id => {
    if (!edit.trim()) return
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        content: edit
      }
    }))
    setEdit('')
  }
  const handleEditTodo = e => {
    setEdit(e.target.value)
  }

  const todoList = todos
    .filter(FILTER_KEY[filters])
    .map(todo =>
      <Todo
        key={todo.id}
        todo={todo}
        handleDeleteTodo={handleDeleteTodo}
        handleToggleClick={handleToggleClick}
        handleEditTodo={handleEditTodo}
        handleOnblur={handleOnblur}
      />
    )

  const filterAll = () => {
    console.log('現在的 todos ', todos)
    console.log('現在的 edit ', edit)
    setFilter('All')
  }

  const filterUnDone = () => {
    setFilter('UnDone')
  }

  const filterDone = () => {
    setFilter('Done')
  }

  return (
    <TodoItemWrapper>
      <TodoTitle>
        Todo
      </TodoTitle>

      <TodoHeader>
        <input type="text" placeholder="請輸入代辦事項" value={value} onChange={handleInputChange} />
        <InputButton onClick={handleButtonClick}>新增</InputButton>
      </TodoHeader>

      <TodoFilter>
        <FilterButton onClick={filterAll} >全部</FilterButton>
        <FilterButton onClick={filterUnDone} >未完成</FilterButton>
        <FilterButton onClick={filterDone} >已完成</FilterButton>
      </TodoFilter>
      {todoList}
      <TodoFooter>
        <DeleteAllButton onClick={handleDeleteAllTodo} >全部刪除</DeleteAllButton>
      </TodoFooter>
    </TodoItemWrapper>
  )
}

export default TodoItem
