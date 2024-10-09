import React from 'react'

function KanbanColumn({children, title, innerRef, ...droppableProps}) {
  return (
    <div className='w-[100%] bg-gray-400 rounded-lg shadow-md'
      ref={innerRef}
      {...droppableProps}
    >
      <h2 className='text-2xl font-semibold m-4'>{title}</h2>
      {children}
    </div>
  )
}

export default KanbanColumn