import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  TOOGLE_TODO,
  DELETE_ALLTODO,
  SET_FILTER
} from './actionTypes'

export function addTodo(content) {
  return {
    type: ADD_TODO,
    payload: {
      content
    }
  }
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id
    }
  }
}

export function deleteAllTodo(id) {
  return {
    type: DELETE_ALLTODO
  }
}

export function editTodo(id, edit) {
  return {
    type: EDIT_TODO,
    payload: {
      id,
      edit
    }
  }
}

export function toogleTodo(id) {
  return {
    type: TOOGLE_TODO,
    payload: {
      id
    }
  }
}

export function setFilter(name) {
  return {
    type: SET_FILTER,
    payload: {
      name
    }
  }
}
