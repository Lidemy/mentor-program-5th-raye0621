/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'

import useBoard from '../customHooks/useBoard'
import GoBangItem from './GoBangItem'
import GoBangInfo from './GoBangInfo'

const GobangItemWrapper = styled.div`
  display: flex;
  // flex-direction: row;
  justify-content: center;
  // text-align: center;
  margin-top: 77px;
`
const GobangBoard = styled.div`
  // white-space:nowrap;
  padding: 10px;
  // width: 760px;  寬高用固定的，主要用 pd
  // height: 760px;
  // background-color: #fff7cd;
  border:  solid 1px rgb(56, 56, 56) ;
  border-width: 3px 2px 2px 1.7px;
  border-radius: 99% 1% 99% 1% / 1% 99% 1% 99%; 
  /* 做出傾斜的視覺感 */
  margin-right: 50px;
`

const Row = styled.div`
  display: flex;
`

const GameInfo = styled.div`
  font-family: 'Cabin Sketch', 'cursive', '微軟正黑體';
  margin-top: 50px;
  text-align: center;
`

function App() {
  const { squares, winner, blackIsNext, handleChessClick, handleReplay, onClickAnimate } = useBoard()
  return (
    <div>
      <GobangItemWrapper>
        <GobangBoard>
          {
            squares.map((row, y) => (
                <Row key={y}>
                  {
                    row.map((col, x) => {
                      // 把座標包成 position
                      const posttion = {
                        x,
                        y
                      }
                      return (
                        <GoBangItem
                          position={posttion}
                          key={x}
                          squares={squares}
                          handleChessClick={handleChessClick}
                        >
                        </GoBangItem>
                      )
                    })
                  }
                </Row>
            ))
          }
        </GobangBoard>
        <GameInfo>
          <GoBangInfo
            winner={winner}
            blackIsNext={blackIsNext.current}
            handleReplay={handleReplay}
            onClickAnimate={onClickAnimate}
          />
        </GameInfo>
      </GobangItemWrapper>
    </div>
  )
}

export default App
