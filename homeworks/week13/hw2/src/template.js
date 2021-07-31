export const cssTemplate = '.card-header { display: flex; justify-content: space-between; } .card-title { display: inline-block; margin: 0; } .more-btn {  margin-bottom: 3rem; } '

export function getFrom(className, commentsClassName) {
  return `
  <div>
    <form class="${className}">
      <div class="mb-3">
        <label class="form-label">暱稱</label>
        <input name="nickname" class="form-control" >
      </div>
      <div class="mb-3">
        <label class="form-label">留言內容</label>
        <textarea name="content" class="form-control" rows="3"></textarea>
      </div>        
      <button type="submit" class="btn btn-primary">送出</button>
    </form>
    <div class="${commentsClassName}">
    </div>  
  </div>
  `
}

export function getLoadMoreButton(className) {
  return `<div class="${className} load-more mt-3 more-btn d-grid gap-2 col-2 mx-auto"><button class="btn btn-primary load-more-btn" type="button">載入更多</button></div>`
}
