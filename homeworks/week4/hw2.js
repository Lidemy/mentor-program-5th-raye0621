const request = require('request')

const action = process.argv[2]
const actionSec = process.argv[3]
const actionThi = process.argv[4]
const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com'

if (action === 'list') {
  listBooks(actionSec)
} else if (action === 'read') {
  readBook(actionSec)
} else if (action === 'delete') {
  deleteBook(actionSec)
} else if (action === 'create') {
  createBook(actionSec)
} else if (action === 'update') {
  updateBook(actionSec, actionThi)
} else {
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
  request(
    `${API_ENDPOINT}/books/${id}`,
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
        console.log('123')
        return
      }
      if (!book.id) {
        console.log('無此編號哦')
        return
      }
      console.log(`${book.id} ${book.name}`)
    }
  )
}
function deleteBook(id) {
  request.del(
      `${API_ENDPOINT}/books/${id}`,
      (err, response) => {
        if (err) {
          console.log('err:', err)
          return
        }
        console.log(`id: ${id} 書籍，刪除成功！`)
      }
  )
}
function createBook(name) {
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
    console.log(`新書籍 ${name}，新增成功！`)
  })
}
function updateBook(id, name) {
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
    console.log(`id: ${id} , 新名稱：${name}}，更新成功！`)
  }
  )
}
