const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  const str = lines[0]
  if (judg(str)) {
    console.log('True')
  } else {
    console.log('False')
  }
}

function judg(n) {
  for (let i = 0; i < n.length / 2; i++) {
    if (n[i] !== n[n.length - 1 - i]) {
      return false
    }
  }
  return true
}
