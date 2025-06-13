import React from 'react'
import Book from '../../components/Book'
import useStore from '../../store/useStore'

function Home() {
  const { selectedChapter } = useStore();

  return (
    <div className="flex-1">
      <Book selectedChapter={selectedChapter} />
    </div>
  )
}

export default Home
