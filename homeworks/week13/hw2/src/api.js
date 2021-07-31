// eslint-disable-next-line import/no-unresolved
import $ from 'jquery'

export function getComments(apiUrl, siteKey, before, cb) {
  // 顯示下面留言
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`
  if (before) {
    url += `&before=${before}`
  }
  $.ajax({
    url // ES6 寫法， value 跟 key 值一樣就寫一個
  }).done((data) => {
    cb(data)
  })
}

// 呼叫 api 將東西傳回來
export function addComments(apiUrl, siteKey, data, cb) {
  // 將輸入的資料傳給 api
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data
  }).done((data) => {
    cb(data)
  })
}
