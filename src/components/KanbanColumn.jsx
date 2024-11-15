import React from 'react'

function KanbanColumn({children, colorTaskWheel, kanbanColorWheel, title, innerRef, ...droppableProps}) {
  return (
    <div style={{backgroundColor: kanbanColorWheel[title]}} className='w-[100%] h-[auto] bg-gray-400 rounded-lg shadow-md overflow-y-auto'
      ref={innerRef}
      {...droppableProps}
    >
      <h2 className='text-2xl font-semibold m-4'>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
      <hr style={{backgroundColor: colorTaskWheel[title]}} className='my-4 mx-4 h-[1px] border-0 ' />
      {children}
    </div>
  )
}

export default KanbanColumn