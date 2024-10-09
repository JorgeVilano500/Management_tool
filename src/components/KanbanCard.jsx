import React from 'react'
import { CiCircleRemove } from "react-icons/ci";

function KanbanCard({text, handleDelete}) {
  return (
    <div className='flex flex-row justify-between p-4 mb-4 bg-white rounded-lg shadow-md w-[100%]'>
      <h3>{text["task_title"]}</h3>
      <button onClick={() => handleDelete(text)} ><CiCircleRemove /></button>
    </div>
  )
}

export default KanbanCard