const request = require('request')

const API_ENDPOINT = 'https://restcountries.eu/rest/v2'
const name = process.argv[2]

request(
  `${API_ENDPOINT}/name/${name}`,
  (error, response, body) => {
    if (error) {
      console.log('抓取失敗', error)
      return
    }
    let data
    try {
      data = JSON.parse(body)
    } catch (error) {
      console.log('抓取失敗', error)
      return
    }
    if (response.statusCode >= 400 && response.statusCode < 500) {
      console.log('找不到國家資訊')
      return
    }
    for (let i = 0; i < data.length; i++) {
      console.log('============')
      console.log(`國家：${data[i].name}`)
      console.log(`首都：${data[i].capital}`)
      console.log(`貨幣：${data[i].currencies[0].code}`)
      console.log(`國碼：${data[i].callingCodes}`)
    }
  }
)
