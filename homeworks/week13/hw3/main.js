const clientID = 'jy2pgfjxw1mzhcpxh43pkxop2b48fz'
const acceptCode = 'application/vnd.twitchtv.v5+json'
const apiUrl = 'https://api.twitch.tv/kraken'
const Headers = {
  headers: {
    Accept: acceptCode,
    'Client-ID': clientID
  }
}

getTopGame()

async function getStream(gameName) {
  const response = await fetch(`${apiUrl}/streams?game=${encodeURIComponent(gameName)}&limit=20`, Headers)
  const stream = await response.json()
  for (let i = 0; i < stream.streams.length; i++) {
    const newStreamCard = document.createElement('div')
    newStreamCard.classList.add('stream_card')
    newStreamCard.innerHTML = `
    <img class="stream_img" src="${stream.streams[i].preview.large}">
    <div class="stream_contact">
      <img class="stream_contact_icon" src="${stream.streams[i].channel.logo}">
      <div class="stream_contact_text">
        <div class="stream_contact_title">${stream.streams[i].channel.status}</div>
        <div class="stream_contact_streamer">${stream.streams[i].channel.name}</div>
      </div>
    </div>`
    document.querySelector('.streams_list').appendChild(newStreamCard)
  }
  addPlaceholder()
  addPlaceholder()
}

async function getTopGame() {
  const response = await fetch(`${apiUrl}/games/top?limit=5`, Headers)
  const topGameData = await response.json()
  const top5Game = []
  for (let i = 0; i < topGameData.top.length; i++) {
    top5Game.push(topGameData.top[i].game.name)
  }
  document.querySelector('.navbar_list').innerHTML = `
  <li class="btn">${top5Game[0]}</li>
  <li class="btn">${top5Game[1]}</li>
  <li class="btn">${top5Game[2]}</li>
  <li class="btn">${top5Game[3]}</li>
  <li class="btn">${top5Game[4]}</li>
  `
  getStream(top5Game[0])
}

document.querySelector('.navbar_list').addEventListener('click',
  (e) => {
    if (e.target.classList.contains('btn')) {
      const clickGame = e.target.innerHTML
      document.querySelector('.streams_list').innerHTML = ''
      getStream(clickGame)
    }
  }
)

function addPlaceholder() {
  const placeholder = document.createElement('div')
  placeholder.classList.add('stream_card_empty')
  document.querySelector('.streams_list').appendChild(placeholder)
}
