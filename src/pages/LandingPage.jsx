import React, {  useState } from 'react'
import { ProjectCard } from '../components'
import {Modal} from '../components';



function LandingPage({projectList, supabase, setProjects}) {
   

    const [newProject, setNewProject] = useState({
        projectName: '', 
        projectDescription: '', 
    })
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    function formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        const newDate =  [year, month, day].join('-');
        return newDate;
    }

    const AddProjectSupabase = async () => {
        const {data, error} = await supabase.from('project_list').insert({id: projectList.length + 1 ,'project_name': newProject.projectName, 'project_description': newProject.projectDescription, 'time_created': formatDate()}).select();

        if(data) toggleModal();
        return setProjects([...projectList, data[0]]);
    }

    const handleDelete = async (id) => {
        const {data, error} = await supabase.from('project_list').delete().eq('id', id);
        setProjects(projectList.filter((item) => item.id != id))
    }

    

  return (
    <div className='w-[100%]'>
        {/* <AddToProjects /> */}
        
        <div className=' flex flex-row justify-center content-center'>
            <h1 className='text-5xl text-center my-4'>Product Management Status Tool</h1>
            <Modal toggleModal={toggleModal} isOpen={isOpen}  >
                <div className='flex flex-col h-[10rem] m-auto'>
                            <input
                            type="hidden"
                            name="addToProjects"
                            value="projectForm"
                            />
                        <div className='flex flex-row h-[90%]'>

                            <input className='h-[25%] m-auto border-[1px] rounded transition ease-in hover:border-red-400' type="text" placeholder='Project Title' value={newProject.projectName} 
                            onChange={(e) => {return setNewProject({
                                // ...newProject,
                                projectName: e.target.value
                            })} } 
                            />
                         <input className='h-[25%] m-auto border-[1px] rounded transition ease-in hover:border-red-400' type="text" placeholder='Project Description' value={newProject.projectDescription} onChange={(e) => {return setNewProject({
                             ...newProject,
                             projectDescription: e.target.value
                            }) }} />
                            </div>
                        <input className='bg-red-500 border border-transparent w-[25%] m-auto py-1 text-white transition ease-in hover:bg-red-900 hover:border-black hover:border-[1px]  ' onClick={AddProjectSupabase} type='submit' placeholder='Submit' />
                    </div> 
                    </Modal> 
        </div>
          {
              projectList ? 
              (
                <>
              <h2 className='text-center'>Select a Project</h2>
              <div className='grid grid-cols-4 w-[100%] grid-rows-2 h-[auto] p-5 justify-items-center '>
              
              {projectList.map((item, index) => (
                  <ProjectCard handleDelete={handleDelete} key={index} id={item["id"]} title={item["project_name"]} description={item["project_description"]} />
                ))}
            </div>
                </>    
        )
                 : (
                    <div className='text-center 
                    /'>
                        <h1>List Unavailable at the moment</h1>

                    </div>
                )
            }
    </div>
  )
}

export default LandingPage;