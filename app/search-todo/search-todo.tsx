import React from 'react'

const SearchTodo = ({search , setSearch}: any) => {
  return (
    <div>
          <input 
          value={search}
           onChange={(e) => setSearch(e.target.value)}
          type="text" className='w-full p-3 rounded-lg border' placeholder='Search todo...' />
    </div>
  )
}

export default SearchTodo
