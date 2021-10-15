/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
import styled from "styled-components"

const Title = styled.div`
font-size: 3.8rem;
`

const Info = styled.div`
font-size: 1.7rem;
margin-top: 80%;
white-space: nowrap;
`

const Chess = styled.div`
display: flex;
justify-content: center;
padding: 50px;
`

const ChessElement = styled.div`
width: 40px;
height: 40px;
transform: scale(0.8);
z-index: 1;
${props => props.blackIsNext &&
`
  border:  solid 1px black ;
  border-width: 4px 3px 3px 2px;
  border-radius: 53% 47% 57% 44% / 44% 48% 55% 53%;
  background:repeating-linear-gradient(-45deg, 
      #000 0, #000 5%, 
      rgb(197, 197, 197) 5%, rgb(209, 209, 209) 10%);

`}

${props => !props.blackIsNext &&
`
  background:white;
  border:  solid 1px black ;
  border-width: 3px 4px 3px 2px;
  border-radius: 54% 42% 48% 53% / 53% 47% 47% 47%;
`}
`

const Winner = styled.div``
const Gameing = styled.div`
${props => props.winner && `
  display: none;
`}
`

const ReplayButton = styled.button`
  border:  solid 1px rgb(56, 56, 56) ;
  border-width: 3px 2px 2px 1.7px;
  border-radius: 99% 1% 99% 1% / 1% 99% 1% 99%; 
  background-color: transparent;
  font-family: 'Cabin Sketch', 'cursive', '微軟正黑體';
  font-size: 1.2rem;
  width: 90%;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ededed;
  }
`

const Bang = styled.p`
  display: inline-block;
  margin: 0;
  position: relative;
  ${props => props.winner && `
    cursor: pointer;
  `}
`

const ClickMe = styled.p`
  font-size: 0.7rem;
  margin: 0;
  display: inline-block;
  position: absolute;
  bottom: 5%;
  right: 25%;
  color: deeppink;
`

const GameInfo = ({ winner, blackIsNext, handleReplay, onClickAnimate }) => {
  const onClick = () => {
    handleReplay()
  }

  const onAnimate = () => {
    onClickAnimate()
  }

  return (
    <>
      <Title>
        Go
        <Bang onClick={onAnimate} winner={winner} >
        bang
          {winner && (
            <ClickMe>
              ClickMe
            </ClickMe>
          )}

        </Bang>
      </Title>

      <Info>
        <Gameing winner={winner}>
          Next Player：
          <Chess>
            <ChessElement blackIsNext={blackIsNext} />
          </Chess>

        </Gameing>

        {winner && (
          <Winner>
            The Winner is：
            <Chess>
              <ChessElement blackIsNext={!blackIsNext} />
            </Chess>
            <ReplayButton onClick={onClick}>
              Play Again
            </ReplayButton>
          </Winner>
        )}
      </Info>
    </>
  )
}

export default GameInfo
