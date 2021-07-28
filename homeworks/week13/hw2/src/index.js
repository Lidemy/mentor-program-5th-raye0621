// eslint-disable-next-line import/no-unresolved
import $ from 'jquery'
import { getComments, addComments } from './api'
import { appendCommentToDOM, appendStyle } from './utils'
import { cssTemplate, getLoadMoreButton, getFrom } from './template'

// 建立新 fn init
// eslint-disable-next-line import/prefer-default-export
export function init(options) {
  // 定義各種東西

  let containerElement = null
  let commentDOM = null
  let lastId = null // 就是 before
  let isEnd = false // 沒東西可以拿了

  const { siteKey } = options
  const { apiUrl } = options
  const loadMoreClassName = `${siteKey}-load-more`
  const commentsClassName = `${siteKey}-comments`
  const formClassName = `${siteKey}-add-comment-form`
  const commentsSelector = `.${commentsClassName}`
  const formSelector = `.${formClassName}`

  containerElement = $(options.containerSelector)
  containerElement.append(getFrom(formClassName, commentsClassName))
  appendStyle(cssTemplate)

  commentDOM = $(commentsSelector)
  getNewComments()
  // 幫載入更多的按鈕以事件代理方式點選到
  $(commentsSelector).on('click', `.${loadMoreClassName}`, () => {
    // console.log('lastId', lastId)
    getNewComments()
  })

  // 輸入暱稱及留言後要做的事情
  $(formSelector).submit((e) => {
    e.preventDefault()
    const nickNameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)
    const newCommentData = {
      site_key: siteKey,
      nickname: nickNameDOM.val(),
      content: contentDOM.val()
    }
    addComments(apiUrl, siteKey, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      // 送完之後清空輸入欄位，並且新增在最上面
      nickNameDOM.val('')
      contentDOM.val('')
      appendCommentToDOM(commentDOM, newCommentData, true)
    })
  })

  function getNewComments() {
    const commentDOM = $(commentsSelector)
    // 讓載入更多的按鈕消失
    $(`.${loadMoreClassName}`).remove()
    // 沒東西拿就跳掉
    if (isEnd) {
      return
    }
    getComments(apiUrl, siteKey, lastId, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      const comments = data.discussions
      for (const comment of comments) {
        appendCommentToDOM(commentDOM, comment)
      }
      const { length } = comments
      if (length === 0) {
        isEnd = true
        $(`.${loadMoreClassName}`).remove()
      } else {
        lastId = comments[length - 1].id
        // 載入更多按鈕
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName)
        $(commentsSelector).append(loadMoreButtonHTML)
      }
    })
  }
}
