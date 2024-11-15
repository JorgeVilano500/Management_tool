import React from 'react'
import { CiCircleRemove } from "react-icons/ci";

function KanbanCard({userInfo, text, handleDelete}) {
  return (
    <section className='shadow-sm shadow-slate-600 rounded-lg group relative'>
    <div className='flex  flex-row justify-between p-4 mb-4 bg-white rounded-lg shadow-md w-[100%]'>
      <p className='hidden absolute group-hover:block w-[90%] h-[100%] inset-x-0 top-0 text-center bg-slate-400'>{text["task_desc"]}</p>
      <h3>{text["task_title"]}</h3>
      {userInfo?.email === import.meta.env.VITE_PRIMARY_USER ? <button onClick={() => handleDelete(text)} ><CiCircleRemove /></button> : <></>}
    </div>
    </section>
  )
}

export default KanbanCard