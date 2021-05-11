const request = require('request')

const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com'

request(
  `${API_ENDPOINT}/books?_limit=10`,
  (err, response, body) => {
    if (err) {
      console.log('err', err)
      return
    }

    let json
    try {
      json = JSON.parse(body)
    } catch (err) {
      console.log(err)
      return
    }

    for (let i = 0; i < json.length; i++) {
      console.log(`${json[i].id} ${json[i].name}`)
    }
  }
)
