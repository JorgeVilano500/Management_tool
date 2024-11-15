import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoProjectSymlink } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ProgressBar from './ProgressBar';

function ProjectCard({userInfo, title, description, id, priorities,priority,  handleDelete, itemTasks}) {
  const [completedPerc, setCompletedPerc] = useState(0)
  useEffect(() => {
    itemTasks.then(response => {
      setCompletedPerc(response);
      return response});
  }, []) 
  return (
    <div className='shadow-lg shadow-slate-200 flex lg:flex-col rounded border-[1px] mx-4 my-2 lg:w-[80%] border-slate-600 justify-between'>
      <section className='flex flex-col '>
        <div style={{backgroundColor: priorities[priority]}} className={`rounded-t text-slate-100 flex flex-row border-slate-600  border-[1px] w-[100%] justify-between  p-8`}>
          <h2 className='xs:text-xs font-semibold xs:w-[100%]'>{title}</h2>
          <p className='lg:py-1 lg:px-2 lg:self-center xs:self-center rounded opacity-50 brightness-200 z-[1] bg-slate-800 border border-black'>{priority}</p>
        </div>
        <p className='m-2'>{itemTasks && <ProgressBar percent={`${Math.floor(completedPerc)}%`} />}</p>

          <p className='p-4'>{description}</p>

      </section>

    <section className='flex flex-row p-4 justify-center'>
      {
        userInfo?.email === import.meta.env.VITE_PRIMARY_USER ? <button onClick={() => handleDelete(id)} className='m-auto p-2 transition ease-in hover:text-slate-500 hover:bg-slate-200  rounded-lg'>
        <RiDeleteBin6Fill />
      </button> :  <></>
      }
     
      <Link to={`/${id}`} className='m-auto p-2 transition ease-in hover:text-slate-500 hover:bg-slate-200  rounded-lg'>
        <GoProjectSymlink />
      </Link>
    </section>
    </div>
  )
}

export default ProjectCard