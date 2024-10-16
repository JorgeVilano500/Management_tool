import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoProjectSymlink } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ProgressBar from './ProgressBar';

function ProjectCard({title, description, id, priorities,priority,  handleDelete, itemTasks}) {
  const [completedPerc, setCompletedPerc] = useState(0)
  useEffect(() => {
    itemTasks.then(response => {
      setCompletedPerc(response);
      console.log(response); 
      return response});
  }, []) 
  return (
    <div className=' flex flex-col rounded border-[1px] mx-4 my-2 w-[80%] border-slate-600 justify-between'>
      <section className='flex flex-col '>
        <div style={{backgroundColor: priorities[priority]}} className={`rounded-t text-slate-100 flex flex-row border-slate-600  border-[1px] w-[100%] justify-between  p-8`}>
          <h2 className=''>{title}</h2>
          <p className='py-1 px-2 rounded opacity-50 brightness-200 bg-slate-800 border border-black'>{priority}</p>

        </div>
        <p className='m-2'>{itemTasks && <ProgressBar percent={`${Math.floor(completedPerc)}%`} />}</p>

          <p className='p-4'>{description}</p>

      </section>

    <section className='flex flex-row p-4 justify-center'>

      <button onClick={() => handleDelete(id)} className='m-auto'>
        <RiDeleteBin6Fill />
      </button>
      <Link to={`/${id}`} className='m-auto'>
        <GoProjectSymlink />
      </Link>
    </section>
    </div>
  )
}

export default ProjectCard