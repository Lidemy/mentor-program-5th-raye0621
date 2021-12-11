import { ADD_TODO, DELETE_TODO, EDIT_TODO, TOOGLE_TODO, DELETE_ALLTODO } from '../actionTypes'

let todoId = 3

const initialState = {
  todos: [
    {
      id: 0,
      content: 'Redux 要設定好多好多東西',
      isDone: true
    },
    {
      id: 1,
      content: '嗨！我是 Raye',
      isDone: false
    },
    {
      id: 2,
      content: 'Never gonna give you up ～',
      isDone: true
    }
  ]
}

// 邏輯寫進來
export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    // 新增
    case ADD_TODO : {
      const { content } = action.payload
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: todoId++,
            content,
            isDone: false
          }
        ]
      }
    }

    // 刪除
    case DELETE_TODO : {
      const { id } = action.payload
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id)
      }
    }

    case DELETE_ALLTODO : {
      return {
        ...state,
        todos: []
      }
    }

    // 修改
    case EDIT_TODO: {
      const { id, edit } = action.payload
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== id) return todo
          return {
            ...todo,
            content: edit
          }
        })
      }
    }

    // 完成未完成
    case TOOGLE_TODO: {
      const { id } = action.payload
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== id) return todo
          return {
            ...todo,
            isDone: !todo.isDone
          }
        })
      }
    }

    default: {
      return state
    }
  }
}
