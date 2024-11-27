import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineInbox, AiOutlineLogout } from "react-icons/ai";
import { MdOutlineWeb } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { GoSidebarCollapse } from "react-icons/go";
import {Modal} from './index';

function Navbar({userInfo, addProjectSupabase, signOut}) {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    projectName: '', 
    projectDescription: '', 
})

  const toggleSidebar = () => {
    console.log('clicked', isSideOpen)
    setIsSideOpen(!isSideOpen)
  }

  const toggleModal = () => {
      setIsOpen(!isOpen)
  }

  return (
    <div className='flex flex-row justify-between h-[3.5rem] bg-slate-500 text-gray-50 items-center'>
        
        <section className='flex flex-row '>
        
          <Link className='flex flex-row mx-2 border border-transparent rounded p-1 font-semibold  transition ease-in hover:border-[1px] hover:text-slate-500 hover:bg-slate-200 hover:border-slate-200' to={'/'}>   <AiOutlineInbox className='self-center mx-1' />PMST</Link>
          <p className='self-center xs:text-xs flex flex-col xs:text-center'>Welcome back! {userInfo?.email ? userInfo?.email : ''}</p>
          </section>

          <section className='xs:flex sm:hidden md:hidden lg:hidden'>
                  {/* Button to toggle the sidebar */}
              <button
                onClick={toggleSidebar}
                className=" self-center border border-transparent  p-1  transition ease-in hover:text-slate-500 hover:bg-slate-200  rounded-[1rem] "
              >
                <GoSidebarCollapse className='w-[2rem] h-[2rem]' />
              </button>
              {/* Sidebar */}
              <div
                className={`fixed z-[8] top-0 left-0 h-full bg-slate-200 text-slate-500 shadow-lg transform ${isSideOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-64 xs:w-80`}
              >
                <button
                  onClick={toggleSidebar}
                  className="p-2 bg-red-500 text-white rounded absolute top-4 right-4"
                >
                  Close
                </button>
                <nav className="p-4">
                  <ul>
                    <li className="py-2"><Link onClick={toggleSidebar} className='p-1' to="/">Home</Link></li>
                    <li className="py-2"><a className=' self-center border border-transparent  p-1  transition ease-in hover:text-slate-500 hover:bg-slate-200  rounded-[1rem]' target='_blank' href={'https://javawebsite.netlify.app/'}>Portfolio</a></li>
                    {userInfo? <li className="py-2">
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
         
        </li>  : <></>}
                {/* logout button */}
                <li className="py-2"> {userInfo ? <button onClick={(e) => {
                      signOut(e)
                      toggleSidebar();
                      }} className='self-center border border-transparent  p-1  transition ease-in hover:text-slate-500 hover:bg-slate-200  rounded-[1rem]'>Logout</button> 
                      :
                      // login button
                       <Link onClick={() => toggleSidebar()} to={`/login`} className=' self-center border border-transparent  p-1  transition ease-in hover:text-slate-500 hover:bg-slate-200  rounded-[1rem]'>Login</Link>}</li>
                  </ul>
                </nav>
              </div>
          </section>

        <section className='xs:hidden flex flex-row mr-2 gap-2'>
          {
            userInfo ? <button onClick={(e) => signOut(e)} className='self-center border border-transparent  p-1  transition ease-in hover:text-slate-500 hover:bg-slate-200  rounded-[1rem]'><AiOutlineLogout className='w-[2rem] h-[2rem]' /></button> : <Link to={`/login`} className=' self-center border border-transparent  p-1  transition ease-in hover:text-slate-500 hover:bg-slate-200  rounded-[1rem]'><IoPersonCircleOutline className='w-[2rem] h-[2rem]' /></Link>

          }
          <a className=' self-center border border-transparent  p-1  transition ease-in hover:text-slate-500 hover:bg-slate-200  rounded-[1rem]' target='_blank' href={'https://javawebsite.netlify.app/'}><MdOutlineWeb className='w-[2rem] h-[2rem]' /></a>
          {userInfo?
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
          : <></>
        }
          </section>
    </div>
  )
}

export default Navbar