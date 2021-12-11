/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react'
import { getPosts, getPost } from '../../WebAPI'
import Pagination from '../../components/Pagination'
import PageTop from '../../components/PageTop'
import Posts from '../../components/Posts'
import { Loading } from '../../components/Loading'

export default function HomePage() {
  // ui state
  const [posts, setPosts] = useState([]) // 分頁：所有分頁
  const [currentPage, setCurrentPage] = useState(1) // 分頁:目前頁面
  const [renderPosts, setRenderPosts] = useState([]) // 分頁:目前要 render 的 5 個 posts
  const [totalPage, setTotalPage] = useState(0) // 分頁：全部共有幾頁
  const [isLoading, setIsLoading] = useState(true)

  // 測試
  const [postTest, setPostTest] = useState([])
  useEffect(() => {
    getPost(1)
  }, [])

  // change page
  const handleChangePage = (page) => {
    setCurrentPage(page)
  }

  // init posts
  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts)
      setIsLoading(false)
    })
  }, [])

  // change pages
  useEffect(() => {
    const first = (currentPage - 1) * 5
    const final = currentPage * 5
    setRenderPosts(posts.slice(first, final))
  }, [posts, currentPage])

  // total page
  useEffect(() => {
    if (posts.length > 0) {
      const finalPage = Math.ceil(posts.length / 5)
      setTotalPage(finalPage)
    }
  }, [posts])

  return (
    <>
      {isLoading && <Loading>Loading！</Loading>}
      <PageTop />
      {/* 五個 */}
      {renderPosts.map((post) => (
        <Posts key={post.id} post={post} />
      ))}

      {/* 分頁 */}
      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          handleChangePage={handleChangePage} />
      )}
    </>
  )
}
