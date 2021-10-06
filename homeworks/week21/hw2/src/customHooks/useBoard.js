/* eslint-disable import/no-unresolved */
import { useEffect, useState, useRef } from 'react'
import { animateData } from '../animate'
import { calculateWinner } from '../utils'

const SIZE = 19

function useBoard() {
  const [squares, setSquares] = useState(Array(SIZE).fill(Array(SIZE).fill(null)))
  const [winner, setWinner] = useState(null)

  // 紀錄最後一步
  const animateStart = useRef(false)
  const blackIsNext = useRef(true)
  const lastX = useRef()
  const lastY = useRef()

  // 最重要的點擊事件
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

  // 再一局
  function handleReplay() {
    setSquares(Array(SIZE).fill(Array(SIZE).fill(null)))
    setWinner(null)
    blackIsNext.current = true
  }

  // 動畫效果，點擊之後也包含棋盤歸零、動畫實現，只有一方勝利才能點
  function onClickAnimate() {
    console.log(winner)
    console.log(blackIsNext.current)

    if (winner === null) return
    console.log(winner)
    console.log(blackIsNext.current)
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
          console.log('i === len')
          endDoing()
        }
      }, i * 100)
    }

    // 動畫結束要做的事歸零，好麻煩
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
