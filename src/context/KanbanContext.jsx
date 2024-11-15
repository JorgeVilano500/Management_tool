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
    const [loggedIn, setLoggedIn] = useState(false)
    const [projects, setProjects] = useState();
    const [displayName, setDisplayName] = useState();
    const [newProject, setNewProject] = useState({
        projectName: '', 
        projectDescription: '', 
    })

    // this is when people are loggin in or registering 
    const [loginInfo, setLoginInfo] = useState({
        email: '', 
        password: ''
    })

    
    //This is when people are authenticated in the page to save their info
    const [userInfo, setUserInfo] = useState()

    const priorities = {
        'low': '#17DB0D',
        'medium': '#D9D752',
        'high': '#F53B0C'
    }


    const fetchProjectDetails = async () => {
        setProjects()
        const {data, error} = await supabase.from('project_list').select('id, project_name, project_description, priority, project_task(task_id, task_status)')
        // 'id, project_name, project_description, time_created, project_task(task_id, project_id, task_status, task_desc, task_title)'
        if(error) {console.log(error)}
        // console.log(data)
        setProjects(data.reverse())
    }

    const fetchUserDetails = async () => {
        const {data: {user}} = await supabase.auth.getUser();

        console.log(user)
        if(user) {
            setLoggedIn(true)
            setUserInfo(user);
        }

    }

    const signOut = async (e) => {
        e.preventDefault();
        setUserInfo()
        setLoggedIn(false);
        const {error} = await supabase.auth.signOut();
    }

    useEffect(() => {
        fetchProjectDetails();
        fetchUserDetails();
    }, [])

    const addProjectSupabase = async () => {
        const {data, error} = await supabase.from('project_list').insert({id: projects.length + 1 ,'project_name': newProject.projectName, 'project_description': newProject.projectDescription, 'time_created': formatDate()}).select();

        if(data) toggleModal();
        return setProjects([...projects, data[0]]);
    }

  

    const handleLoginChange = (e) => {
        e.preventDefault();
        const [stateInfo, loginInfo] = [e.target.id, e.target.value]
        setLoginInfo(prev => ({...prev, [stateInfo]: loginInfo}))
    }

    const handleLoginFetch = async (e) => {
        e.preventDefault();
        const {data, error} = await supabase.auth.signInWithPassword({
            email: loginInfo.email, 
            password: loginInfo.password
        })

        if(error) {
            alert('Invalid credentials')
            setLoginInfo({
                email: '', 
                password: ''
            })
            return console.log('Login Error', error)
        }
            else if (data.user){
                console.log(data);
                setUserInfo(data);
                setLoggedIn(true);
            }

    }

    const createUserFetch = async (e) => {
        e.preventDefault();
        const {data, error} = await supabase.auth.signUp({
            email: loginInfo.email, 
            password: loginInfo.password
        })
        if(error) return console.log(error.message)
       

    }



    return (
        <KanbanContext.Provider value={{signOut, loggedIn, userInfo, loginInfo, createUserFetch, handleLoginChange, handleLoginFetch, projects, supabase, setProjects, priorities, displayName, addProjectSupabase}}>
            {children}
        </KanbanContext.Provider>
    )
}