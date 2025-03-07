import React, {useEffect, useState} from 'react'
import {KanbanCard, KanbanColumn, SafariLoader} from '../components/index'
import { useParams } from 'react-router'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useKanbanContext } from '../context/KanbanContext'
import { v4 as uuidv4 } from 'uuid';
import {Modal} from '../components'
import { TfiSearch } from "react-icons/tfi";
import { FaPlus } from "react-icons/fa6";



function KanbanUI() {
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    done: []
  });
  const colorTaskWheel = {
    todo: '#16D921',
    inProgress: '#E08A48',
    done: '#8841FA'
  }
  const kanbanColorWheel = {
    todo: '#DB3232',
    inProgress: '#FC8F42',
    done: '#4AA2D9'
  }
  const [loading, setLoading] = useState(false)
  const {projectId} = useParams();
  const {supabase, userInfo} = useKanbanContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (taskStatus) => {
    //opens up modal
      setIsOpen(!isOpen)
    // and then set the task status automatically in the background
      setTaskForm(prev => ({...prev, taskStatus: taskStatus}))
  }

  // const [initialColumns, setInitialColumns] = useState({
  //   todo: [],
  //   inProgress: [], 
  //   done: []
  // })
  const [title, setTitle] = useState('')

  const [taskForm, setTaskForm] = useState({
    taskName: '', 
    taskDesc: '',
    taskStatus: ''
  })


  const onDragEnd = async (result) => {
    const {source, destination} = result;
    if(!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const [movedItem] = sourceColumn.splice(source.index, 1);

    destColumn.splice(destination.index, 0, movedItem);

    // console.log('Source', sourceColumn)
    // console.log('dest', destColumn)
    // console.log('moved', movedItem)
  
    setColumns({
      ...columns, 
      [source.droppableId]:sourceColumn, 
      [destination.droppableId]:destColumn
    });
    updateProjectTask(movedItem, destination.droppableId)

  }
  const fetchProjectTasks = async () => {
    setLoading(true);
    // setColumns({
    //   todo: [], 
    //   inProgress: [], 
    //   done: []
    // })
    // if(columns) {setColumns(initialData)}
    const {data, error} = await supabase.from('project_list').select('id, project_name, project_description,  project_task!inner(task_id, task_status, task_desc, task_title)').eq('project_task.project_id', projectId)
    // console.log(data);
    if(!data){ return setColumns({
      todo: [], 
      inProgress: [], 
      done: []
    })}
      if(data.length === 0) {
        const {data, error} = await supabase.from('project_list').select('id, project_name, project_description, ').eq('id', projectId);
        setTitle(data[0]['project_name'])
        
        setLoading(false);
        window.alert('Cannot Find tasks')
      }
      setTitle(data[0]['project_name'])
      await data[0]['project_task'].forEach((item) => {
        
        // console.log(item);
        switch(item['task_status']) {
        case 'todo': 
        setColumns(prev => ({...prev, todo: [ item, ...prev.todo] }));
          break;
        case 'inProgress': 
        setColumns(prev => ({...prev, inProgress: [ item, ...prev.inProgress] }));
          // console.log(columns);
          break;
        case 'done': 
        setColumns(prev => ({...prev, done: [ item, ...prev.done] }));
          // console.log(columns);
          break;
        default:
          console.log('is there an error?', error); }
      // console.log(initialData);
      // setColumns({...columns, [item["task_status"]]: [...columns[item["task_status"]], item]})
      
      // console.log(item["task_status"])
    })
    setLoading(false);
    // console.log(columns)
  }

  const updateProjectTask = async (moved, id) => {
    // console.log(id);
    const {data, error} = await supabase.from('project_task').update({'task_status': id}).eq('task_id', moved['task_id']).select();
    // console.log(data);

  }

  const insertNewTask = async () => {
    const {data, error} = await supabase.from('project_task').insert({'task_id': uuidv4(), 'project_id': projectId, 'task_status': taskForm.taskStatus, 'task_desc': taskForm.taskDesc, 'task_title': taskForm.taskName }).select();
    if(error) window.alert(error);
    let newObj = {

    }
    setColumns({...columns, [taskForm.taskStatus]: [...columns[taskForm.taskStatus], data[0]]})
    if(data) toggleModal('');
  }

  const handleDelete = async (id) => {
    // console.log(id);
    const {data, error} = await supabase.from('project_task').delete().eq('task_id', id["task_id"]);
    // console.log(data);
    switch(id["task_status"]) {
      case 'todo': 
        setColumns({...columns, todo: columns.todo.filter(item => item["task_id"] != id["task_id"]) });
        // console.log(columns);
        break;
      case 'inProgress': 
        setColumns({...columns, inProgress: columns.inProgress.filter(item => item["task_id"] != id["task_id"]) });
        // console.log(columns);
        break;
      case 'done': 
        setColumns({...columns, done: columns.done.filter(item => item["task_id"] != id["task_id"]) });
        // console.log(columns);
        break;
      default: 
        console.log('is there an id?', id);
    }
  }
  useEffect(() => { 
    fetchProjectTasks();
    
    // console.log(initialColumns)
  }, [ projectId])

  if(loading) return (<SafariLoader />)
    // {title ? title : <></>}

  return (
    <div className='lg:h-[auto] xs:w-[100%]'>
      <section className='flex flex-row justify-between w-[80%] m-auto mt-4 bg-slate-200 p-3 rounded'>

        <h1 className='xs:text-xl font-semibold md:text-2xl lg:text-3xl self-center'>{title ? title : <>Tasks</>}</h1>
        <div className='flex flex-row'>
          <TfiSearch className='w-[2rem] h-[2rem] self-center mx-3 bg-slate-400 p-2 rounded ' />
          {userInfo ? 
            <Modal task={'Task'}  isOpen={isOpen} toggleModal={() => toggleModal('todo')}>
               <section className='text-center flex flex-col'>
                <h2 className='text-semibold'>Add A Task</h2>
                <section>
                  <input className='bg-slate-300 w-[25%] m-4 text-center focus:bg-slate-500 text-slate-50 rounded' onChange={(e) => setTaskForm({...taskForm, taskName: e.target.value})}  placeholder='Title' />
                  <input className='bg-slate-300 w-[25%] m-4 text-center focus:bg-slate-500 text-slate-50 rounded' onChange={(e) => setTaskForm({...taskForm, taskDesc: e.target.value})} placeholder='Description' />
                </section>
                <button className='bg-slate-500 p-1 rounded w-[25%] m-auto text-slate-50 mt-2' onClick={insertNewTask}>Submit</button>
              </section>
            </Modal>
          :  
            <></>
        }

     
    </div>
      </section>
      <DragDropContext
        enableStrictMode
        onDragEnd={onDragEnd}
      >
        <div className='flex xs:flex-col lg:flex-row justify-evenly items-stretch p-4    '> 
          {columns ? Object.entries(columns).map(([columnId, tasks], index) => (
            <Droppable 

              key={columnId}
              droppableId={columnId}
            >
              {(provided) => (
               <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='lg:w-[100%] p-2 flex items-stretch'
               >

                  <KanbanColumn
                    // innerRef={provided.innerRef}
                    // {...provided.droppableProps}
                    title={columnId}
                    colorTaskWheel={colorTaskWheel}
                    kanbanColorWheel={kanbanColorWheel}
                  >
                    {
                      tasks.map((task, taskIndex) => (
                        <Draggable   key={task["task_id"]} draggableId={`${task["task_id"]}-${taskIndex}`} index={taskIndex} >
                          {(provided) => (
                            <div
                            className='w-[90%] m-auto'
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <KanbanCard userInfo={userInfo} handleDelete={handleDelete} text={task} />

                            </div>
                          )}
                        </Draggable>
                      ))
                    }
                    {userInfo ? 

                      <button onClick={() => toggleModal(columnId)} className='w-[90%] shadow-sm shadow-slate-800 text-slate-200 m-auto mb-3 rounded-xl p-2 flex flex-row justify-center gap-2  border-dashed border-[1px] transition ease-in hover:bg-slate-200 hover:border-black hover:border-solid hover:text-slate-800'><FaPlus className='self-center' /> Add new task</button>
                    :
                    <></>  
                  }
                  </KanbanColumn>
                            {/* The placeholder should be included here, within the Droppable */}
                {provided.placeholder}
                    </div>

               
              )}
            </Droppable>
          )): <></>}


        </div>
      </DragDropContext>
        
        
    </div>
  )
}

export default KanbanUI