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
  const m = Number(lines[0])
  for (let i = 1; i <= m; i++) {
    const arr = lines[i].split(' ')
    console.log(whoWin(arr[0], arr[1], arr[2]))
  }
}

function whoWin(a, b, k) {
  if (a === b) return 'DRAW'
  if (k === '-1') {
    const temp = a
    a = b
    b = temp
  }
  const lengthA = a.length
  const lengthB = b.length
  if (lengthA !== lengthB) {
    return lengthA > lengthB ? 'A' : 'B'
  }
  return a > b ? 'A' : 'B'
}
