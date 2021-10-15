/* eslint-disable import/no-unresolved */
import { useEffect, useState, useRef } from 'react'
import { animateData } from '../animate'
import { calculateWinner } from '../utils'

const SIZE = 19

function useBoard() {
  const [squares, setSquares] = useState(Array(SIZE).fill(Array(SIZE).fill(null)))
  const [winner, setWinner] = useState(null)

  const animateStart = useRef(false)
  const blackIsNext = useRef(true)
  const lastX = useRef()
  const lastY = useRef()

  function handleChessClick(position) {
    const { x, y } = position
    if (squares[y][x] || winner || !animateStart) return
    lastX.current = x
    lastY.current = y

    const squaresCopy = JSON.parse(JSON.stringify(squares))
    squaresCopy[y][x] = blackIsNext.current ? 'black' : 'white'
    setSquares(squaresCopy)
    blackIsNext.current = !blackIsNext.current
  }

  function handleReplay() {
    setSquares(Array(SIZE).fill(Array(SIZE).fill(null)))
    setWinner(null)
    blackIsNext.current = true
  }

  // 動畫效果，點擊之後也包含棋盤歸零、動畫實現，只有一方勝利後才能點
  function onClickAnimate() {
    if (winner === null) return
    if (!animateStart) return
    animateStart.current = true

    // 動畫
    setSquares(Array(SIZE).fill(Array(SIZE).fill(null)))
    const len = animateData.length
    for (let i = 0; i < len; i++) {
      setTimeout(() => {
        setSquares(animateData[i])
        setWinner(null)

        if (i === len - 1) {
          endDoing()
        }
      }, i * 100)
    }

    // 動畫結束要做的事
    function endDoing() {
      setWinner(null)
      blackIsNext.current = true
      animateStart.current = false
    }
  }

  // 棋盤都全渲染好後判斷輸贏
  useEffect(() => {
    if (lastX.current === undefined || lastY.current === undefined) return
    if (calculateWinner(squares, lastX.current, lastY.current)) {
      setWinner(calculateWinner(squares, lastX.current, lastY.current))
    }
  }, [squares])

  return {
    squares,
    winner,
    blackIsNext,
    handleChessClick,
    handleReplay,
    onClickAnimate
  }
}

export default useBoard
