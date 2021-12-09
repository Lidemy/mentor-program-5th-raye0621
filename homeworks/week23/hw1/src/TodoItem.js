/* eslint-disable no-unused-vars */
import {
  TodoContents,
  TodoContent,
  TodoContentText,
  StateButton,
  ReButton
} from './components/TodoItem'

export default function TodoItem({ todo, handleEdit, handleChangeEdit, handleDelete, handleToogle }) {
  return (
    <TodoContents data-todo-id={todo.id}>
      <TodoContent>
        <TodoContentText $isDone={todo.isDone} >
          <input defaultValue={todo.content} onChange={handleEdit}
            onBlur={() => {
              handleChangeEdit(todo.id)
            }} />
        </TodoContentText>
        <StateButton
          $isDone={todo.isDone}
          onClick={() => handleToogle(todo.id)}
        >
          {todo.isDone ? '已完成' : '未完成'}
        </StateButton>
        <ReButton onClick={() => {
          handleDelete(todo.id)
        }}>
          刪除
        </ReButton>
      </TodoContent>
    </TodoContents>
  )
}
