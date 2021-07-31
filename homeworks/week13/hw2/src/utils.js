export function appendStyle(cssTemplate) {
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(cssTemplate))
  document.head.appendChild(styleElement)
}

// escape 函式
export function escape(string) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  }
  const reg = /[&<>"'/]/ig
  return string.replace(reg, (match) => (map[match]))
}

// 為了及時新增功能，將新增的東西包成 函式
export function appendCommentToDOM(container, comment, isPrepend) {
  const html = `
    <div class="card mt-3">
      <div class="card-header">
        <span class="card-title">
          ${escape(comment.nickname)}
        </span>
      </div>
      <div class="card-body">
        <p class="card-text">${escape(comment.content)}</p>
      </div>
    </div>
  `
  if (isPrepend) {
    container.prepend(html)
  } else {
    container.append(html)
  }
}
