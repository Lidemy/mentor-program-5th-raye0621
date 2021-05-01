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
  for (let i = 1; i <= Number(lines[0]); i++) {
    console.log(repeat(i, '*'))
  }
}
let repeat = (n, str) => {
  let result = ''
  for (let i = 0; i < n; i++) {
    result += str
  }
  return result
}
