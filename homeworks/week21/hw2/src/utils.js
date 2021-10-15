function countRepeat(squares, lastX, lastY, directionX, directionY) {
  let result = 0
  let tempX = directionX
  let tempY = directionY
  const now = squares[lastY][lastX]
  while (squares[lastY + tempX] && squares[lastY + tempX][lastX + tempY] === now) {
    result++
    tempX += directionX
    tempY += directionY
  }
  return result
}

// eslint-disable-next-line import/prefer-default-export
export function calculateWinner(squares, lastX, lastY) {
  if (
    countRepeat(squares, lastX, lastY, 1, 1) + countRepeat(squares, lastX, lastY, -1, -1) >= 4 ||
    countRepeat(squares, lastX, lastY, 1, 0) + countRepeat(squares, lastX, lastY, -1, 0) >= 4 ||
    countRepeat(squares, lastX, lastY, 0, 1) + countRepeat(squares, lastX, lastY, 0, -1) >= 4 ||
    countRepeat(squares, lastX, lastY, -1, 1) + countRepeat(squares, lastX, lastY, 1, -1) >= 4
  ) {
    return squares[lastY][lastX]
  }
  return null
}
