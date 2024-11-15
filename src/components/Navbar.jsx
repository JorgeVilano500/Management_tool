import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineInbox } from "react-icons/ai";
import { MdOutlineWeb } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import {Modal} from './index';

function Navbar({userInfo, displayName, addProjectSupabase}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    projectName: '', 
    projectDescription: '', 
})


  const toggleModal = () => {
      setIsOpen(!isOpen)
  }

  return (
    <div className='flex flex-row justify-between h-[3.5rem] bg-slate-500 text-gray-50 items-center'>
        
        <section className='flex flex-row '>
        
          <Link className='flex flex-row mx-2 border border-transparent rounded p-1 font-semibold  transition ease-in hover:border-[1px] hover:text-slate-500 hover:bg-slate-200 hover:border-slate-200' to={'/'}>   <AiOutlineInbox className='self-center mx-1' />PMST</Link>
          <p className='self-center'>Welcome back! {userInfo ? userInfo?.email : ''}</p>
          </section>

        <section className='flex flex-row mr-2 gap-2'>
          <Link to={`/login`} className=' self-center border border-transparent  p-1  transition ease-in hover:text-slate-500 hover:bg-slate-200  rounded-[1rem]'><IoPersonCircleOutline className='w-[2rem] h-[2rem]' /></Link>
          <a className=' self-center border border-transparent  p-1  transition ease-in hover:text-slate-500 hover:bg-slate-200  rounded-[1rem]' target='_blank' href={'https://javawebsite.netlify.app/'}><MdOutlineWeb className='w-[2rem] h-[2rem]' /></a>
          <Modal task={'Project'} toggleModal={toggleModal} isOpen={isOpen}  >
                <div className='flex xs:flex-col lg:flex-col sm:h-[5rem] lg:h-[10rem] m-auto'>
                            <input
                            type="hidden"
                            name="addToProjects"
                            value="projectForm"
                            />
                        <div className='flex xs:flex-col lg:flex-row  xs:h-[80%] lg:h-[90%]'>

                            <input className='xs:my-2 xs:h-[100%] lg:h-[25%] m-auto border-[1px] rounded transition ease-in hover:border-red-400' type="text" placeholder='Project Title' value={newProject.projectName} 
                            onChange={(e) => {return setNewProject({
                                // ...newProject,
                                projectName: e.target.value
                            })} } 
                            />
                         <input className='xs:my-2 xs:h-[100%] lg:h-[25%] m-auto border-[1px] rounded transition ease-in hover:border-red-400' type="text" placeholder='Project Description' value={newProject.projectDescription} onChange={(e) => {return setNewProject({
                             ...newProject,
                             projectDescription: e.target.value
                            }) }} />
                            </div>
                        <input className='bg-red-500 border border-transparent rounded sm:mt-2 sm:w-[50%] lg:w-[25%] m-auto py-1 text-white transition ease-in hover:bg-red-900 hover:border-black hover:border-[1px]  ' onClick={addProjectSupabase} type='submit' placeholder='Submit' />
                    </div> 
                    </Modal> 
        </section>
    </div>
  )
}

export default Navbar