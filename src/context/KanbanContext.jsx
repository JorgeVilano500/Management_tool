import React, {createContext, useContext, useEffect, useState} from 'react';
import {useLocalStorage} from '../hooks/useLocalStorage';
import { createClient } from '@supabase/supabase-js';

const supabaseURL = import.meta.env.VITE_SUPABASE_URL; 
const supabaseAP = import.meta.env.VITE_SUPABASE_ANON_KEY;

const KanbanContext = createContext();

export function useKanbanContext() {
    return useContext(KanbanContext)
}
const supabase = createClient(supabaseURL, supabaseAP);

export function KanbanContextProvider({children}) {
    const [projects, setProjects] = useState();



    const fetchProjectDetails = async () => {
        setProjects()
        const {data, error} = await supabase.from('project_list').select('id, project_name, project_description')
        // 'id, project_name, project_description, time_created, project_task(task_id, project_id, task_status, task_desc, task_title)'
        if(error) {console.log(error)}
        // console.log(data)
        setProjects(data)
    }

    useEffect(() => {
        fetchProjectDetails();
    }, [])

    

    return (
        <KanbanContext.Provider value={{projects, supabase, setProjects}}>
            {children}
            
        </KanbanContext.Provider>
    )
}