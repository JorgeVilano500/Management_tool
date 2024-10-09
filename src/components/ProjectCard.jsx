import React from 'react';
import { Link } from 'react-router-dom';
import { GoProjectSymlink } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";

function ProjectCard({title, description, id, handleDelete}) {
  return (
    <div className=' flex flex-row border-[1px] mx-4 my-2 w-[80%] border-slate-600 justify-between'>
      <section className='flex flex-col'>
          <h2>{title}</h2>
          <p>{description}</p>

      </section>

    <section className='flex flex-row'>

      <button onClick={() => handleDelete(id)} className=''>
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