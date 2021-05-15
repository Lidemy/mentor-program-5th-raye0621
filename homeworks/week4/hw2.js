const request = require('request')

const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com'
const [, , action, actionSec, actionThi] = process.argv

switch (action) {
  case 'list':
    listBooks(actionSec)
    break
  case 'read':
    readBook(actionSec)
    break
  case 'delete':
    deleteBook(actionSec)
    break
  case 'create':
    createBook(actionSec)
    break
  case 'update':
    updateBook(actionSec, actionThi)
    break
  default:
    console.log('指令錯誤！ 可用指令：list、read、delete、create、update。')
}
function listBooks() {
  request(
    `${API_ENDPOINT}/books?_limit=20`,
    (err, response, body) => {
      if (err) {
        console.log('抓取失敗', err)
        return
      }
      let book
      try {
        book = JSON.parse(body)
      } catch (err) {
        console.log(err)
        return
      }
      for (let i = 0; i < book.length; i++) {
        console.log(`${book[i].id} ${book[i].name}`)
      }
    }
  )
}
function readBook(id) {
  if (!id || isNaN(id)) {
    console.log('請輸入欲查詢書籍 id!')
    return
  }
  request(
    `${API_ENDPOINT}/books/${id}`,
    (err, response, body) => {
      if (err) {
        console.log('抓取失敗，失敗信息：', err)
        return
      }
      let book
      try {
        book = JSON.parse(body)
      } catch (err) {
        console.log(err)
        return
      }
      if (!book.id) {
        console.log('無此編號哦～')
        return
      }
      if (response.statusCode >= 400 && response.statusCode < 500) {
        console.log('You fucked up!')
        return
      }
      if (response.statusCode >= 500 && response.statusCode < 600) {
        console.log('i fucked up!')
        return
      }
      console.log(`${book.id} ${book.name}`)
    }
  )
}
function deleteBook(id) {
  if (!id || isNaN(id)) {
    console.log('請輸入要刪除書籍之 id！')
    return
  }
  request.del(
      `${API_ENDPOINT}/books/${id}`,
      (err, response) => {
        if (err) {
          console.log('資料刪除失敗，錯誤信息 :', err)
          return
        }
        if (response.statusCode === 404) {
          console.log('id 不存在！請確認有此書籍。')
          return
        }
        if (response.statusCode >= 400 && response.statusCode < 500) {
          console.log('You fucked up!')
          return
        }
        if (response.statusCode >= 500 && response.statusCode < 600) {
          console.log('i fucked up!')
          return
        }
        console.log(`id: ${id} 書籍，刪除成功！`)
      }
  )
}
function createBook(name) {
  if (!name) {
    console.log('請輸入書名！')
    return
  }
  request.post({
    url: `${API_ENDPOINT}/books`,
    form: {
      name
    }
  },
  (err, response) => {
    if (err) {
      console.log('新增失敗', err)
      return
    }
    if (response.statusCode >= 400 && response.statusCode < 500) {
      console.log('You fucked up!')
      return
    }
    if (response.statusCode >= 500 && response.statusCode < 600) {
      console.log('I fucked up!')
      return
    }
    console.log(`新書籍 ${name}，新增成功！`)
  })
}

function updateBook(id, name) {
  if (!id || isNaN(id)) {
    console.log('請輸入要修正之書籍 id 及新書名(請照順序)！')
    return
  }
  if (!name) {
    console.log('請輸入修改後新書名！')
    return
  }
  request.patch({
    url: `${API_ENDPOINT}/books/${id}`,
    form: {
      name
    }
  },
  (err, response) => {
    if (err) {
      console.log('更新失敗', err)
      return
    }
    if (response.statusCode === 404) {
      console.log('請輸入已存在書籍！')
      return
    }
    if (response.statusCode >= 400 && response.statusCode < 500) {
      console.log('You fucked up!')
      return
    }
    if (response.statusCode >= 500 && response.statusCode < 600) {
      console.log('I fucked up!')
      return
    }
    console.log(`id: ${id} , 新名稱：${name}，更新成功！`)
  }
  )
}
