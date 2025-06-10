import React, { useRef, useState} from 'react'
import { CiCircleRemove } from "react-icons/ci";
import {TaskModal, ModalContentCard} from './index'

// function KanbanCard({userInfo, text, handleDelete}) {
//   return (
//     <section className='shadow-sm shadow-slate-600 rounded-lg group relative'>
//     <div className='flex  flex-row justify-between p-4 mb-4 bg-white rounded-lg shadow-md w-[100%]'>
//       <p className='hidden absolute group-hover:block w-[90%] h-[100%] inset-x-0 top-0 text-center bg-slate-400'>{text["task_desc"]}</p>
//       <h3>{text["task_title"]}</h3>
//       {userInfo?.email === import.meta.env.VITE_PRIMARY_USER ? <button onClick={() => handleDelete(text)} ><CiCircleRemove /></button> : <></>}
//     </div>
//     </section>
//   )
// }

function KanbanCard({userInfo, text, handleDelete, loggedIn}) {
  const ref = useRef()

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [editText, setEditText] = useState(text['task_desc']);

  


  return (
    // <!-- From Uiverse.io by anniekoop --> 
    <div className="card !my-4 ">
      <div className="container">
        <div className="left">
          <div className="status-ind"></div>
        </div>
        <div className="right">
          <div className="text-wrap">
            <p className="text-content">
              {/* <a className="text-link" href="#">Jane Doe</a> invited you to edit the
              <a className="text-link" href="#">Web Design</a> file. */}
              {text["task_title"]}
            </p>
            {/* <p className="time">{text["time_created"]}</p> */}
          </div>
          <div className="button-wrap">
            <button onClick={() => setModal(true)} className="primary-cta">View Task</button>
            {/* <button className="secondary-cta">Mark as read</button> */}
            {userInfo?.email === import.meta.env.VITE_PRIMARY_USER ? <button onClick={() => handleDelete(text)} ><CiCircleRemove className='text-blue-500 transition ease-in-out hover:text-gray-200' /></button> : <></>}
              <TaskModal closeModal={() => setModal(false)} openModal={modal}>
                <ModalContentCard loggedIn={loggedIn} text={text["task_desc"]} editModal={editModal} setEditModal={setEditModal} editText={editText} setEditText={setEditText}/>
              </TaskModal>

          </div>
        </div>
      </div>
      
    </div>
    
   
  )
}

export default KanbanCard 