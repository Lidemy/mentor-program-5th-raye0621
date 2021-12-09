/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { selectTodos, selectFilters } from './redux/selectors'
import { addTodo, editTodo, deleteTodo, toogleTodo, deleteAllTodo, setFilter } from './redux/actions'
import TodoItem from './TodoItem'
import {
  TodoItemWrapper,
  TodoTitle,
  TodoHeader,
  InputButton,
  TodoFilter,
  FilterButton,
  TodoFooter,
  DeleteAllButton
} from './components/Todo'

export default function Todo() {
  const todos = useSelector(selectTodos)
  const filters = useSelector(selectFilters)
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [edit, setEdit] = useState('')

  const handleEdit = (e) => {
    setEdit(e.target.value)
  }
  const handleChangeEdit = (id) => {
    if (!edit.trim()) return
    dispatch(editTodo(id, edit))
    setEdit('')
  }
  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }
  const handleToogle = (id) => {
    dispatch(toogleTodo(id))
  }
  const FILTER_KEY = {
    All: (todo) => todo,
    UnDone: (todo) => todo.isDone === false,
    Done: (todo) => todo.isDone === true
  }

  const todoList = todos
    .filter(FILTER_KEY[filters])
    .map((todo) =>
    <TodoItem
      todo={todo}
      key={todo.id}
      handleEdit={handleEdit}
      handleChangeEdit={handleChangeEdit}
      handleDelete={handleDelete}
      handleToogle={handleToogle}
    />)

  return (
    <TodoItemWrapper>
      <TodoTitle>
        Final Todo
      </TodoTitle>

      {/* Todo 輸入欄 */}
      <TodoHeader>
        <input
          type="text"
          placeholder="請輸入代辦事項"
          value={value}
          onChange={(e) => setValue(e.target.value)} />
        <InputButton onClick={() => {
          if (!value.trim()) return
          dispatch(addTodo(value))
          setValue('')
        }}>新增</InputButton>
      </TodoHeader>

      {/* 這裡分類分類 */}
      <TodoFilter>
        <FilterButton onClick={() => dispatch(setFilter('All'))} >全部</FilterButton>
        <FilterButton onClick={() => dispatch(setFilter('UnDone'))} >未完成</FilterButton>
        <FilterButton onClick={() => dispatch(setFilter('Done'))} >已完成</FilterButton>
      </TodoFilter>
      {/* Todo */}
      {todoList}
      {/* 全部刪除 */}
      <TodoFooter>
        <DeleteAllButton
          onClick={() => dispatch(deleteAllTodo())}
        >
          全部刪除
        </DeleteAllButton>
      </TodoFooter>
    </TodoItemWrapper>
  )
}
