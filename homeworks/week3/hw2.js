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
  const n = Number(lines[0].split(' ')[0])
  const m = Number(lines[0].split(' ')[1])
  for (let i = n; i <= m; i++) {
    if (flower(i)) {
      console.log(i)
    }
  }
}

function flower(n) {
  let m = n
  let sum = 0
  for (let i = 0; i < digits(n); i++) {
    sum += (m % 10) ** digits(n)
    m = Math.floor(m / 10)
  }
  if (n === sum) {
    return true
  } else return false
}
function digits(n) {
  if (n === 0) return 1
  let result = 0
  while (n !== 0) {
    n = Math.floor(n / 10)
    result++
  }
  return result
}
