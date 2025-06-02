import React, {  useEffect, useState } from 'react'
import { ProjectCard } from '../components'
import {Modal} from '../components';
import { ImSpinner9 } from "react-icons/im";
 import { useKanbanContext } from '../context/KanbanContext';



function LandingPage({projectList, supabase, setProjects, priorities, addProjectSupabase}) {
    
    const { userInfo} = useKanbanContext();
  
   
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
    const handleTaskProgess = async (list) => {
        let completedPercent;
        let totalListVal = list.length; 
        let completedListVal = 0;
         await list.forEach(item => {
            if(item["task_status"] === 'done') {
                completedListVal++;
            }
            // console.log(completedPercent)
        })
        completedPercent = (completedListVal / totalListVal) * 100
        return   completedPercent;
    }



    const handleDelete = async (id) => {
        const {data, error} = await supabase.from('project_list').delete().eq('id', id);
        setProjects(projectList.filter((item) => item.id != id))
    }

    

  return (
    <div className='md:w-[100%]'>
        {/* <AddToProjects /> */}
        
        <div className=' flex flex-row justify-center content-center'>
            <h1 className='xs:text-2xl font-semibold m-auto md:text-3xl lg:text-5xl text-center lg:my-4 '>Product Management Status Tool</h1>
            
        </div>
          {
              projectList ? 
              (
                <>
              <h2 className='text-center'>Select a Project</h2>
              <div className='grid xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xs:w-[100%] lg:w-[100%] grid-rows-2 h-[auto] p-5 justify-items-center '>
              
              {projectList.map((item, index) => {
                const projectPercent = handleTaskProgess(item["project_task"]).then(response => { return response});
                return (
                  <ProjectCard userInfo={userInfo} priorities={priorities} itemTasks={projectPercent} handleDelete={handleDelete} key={index} id={item["id"]} title={item["project_name"]} priority={item["priority"]} description={item["project_description"]} />
                )})}
            </div>
                </>
        )
                 : (
                    <div className='text-center w-[10%] m-auto'>
                       <ImSpinner9 className=' animate-spin' style={{width: '3rem', height: '5rem'}} />

                    </div>
                )
            }
    </div>
  )
}

export default LandingPage;