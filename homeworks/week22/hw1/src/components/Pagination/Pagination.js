/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import styled from 'styled-components'
import PropTypes from 'prop-types'

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 50px;
`
const CurrentPage = styled.div`
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ArrowWrapper = styled.div`
  min-width: 60px;
  display: flex;
  align-item: center;
  justify-content: center;
`
const PaginationIcon = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
`

export default function Pagination({ currentPage, handleChangePage, totalPage }) {
  return (
    <PaginationWrapper>
      <ArrowWrapper>
        { currentPage !== 1 && (
          <PaginationIcon
            onClick={() => handleChangePage(currentPage - 1)}
            src="left.png" />
        )}
      </ArrowWrapper>

      <CurrentPage>
        目前頁數：
        <p style={{ width: '2rem' }}>{currentPage}</p>
      </CurrentPage>

      <ArrowWrapper>
        { currentPage !== totalPage && (
          <PaginationIcon
            onClick={() => handleChangePage(currentPage + 1)}
            src="right.png" />
        )}
      </ArrowWrapper>
    </PaginationWrapper>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  handleChangePage: PropTypes.func,
  totalPage: PropTypes.number
}
