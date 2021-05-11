const request = require('request')

const API_ENDPOINT = 'https://api.twitch.tv/kraken'
const clientID = 'jy2pgfjxw1mzhcpxh43pkxop2b48fz'

request(
  {
    url: `${API_ENDPOINT}/games/top`,
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': clientID
    }
  },
  (error, response, body) => {
    if (error) {
      console.log(`抓取失敗 ${error}`)
      return
    }
    let data
    try {
      data = JSON.parse(body)
    } catch (error) {
      console.log(`抓取失敗 ${error}`)
      return
    }
    for (let i = 0; i < data.top.length; i++) {
      console.log(`${data.top[i].viewers} ${data.top[i].game.name}`)
    }
  }
)
