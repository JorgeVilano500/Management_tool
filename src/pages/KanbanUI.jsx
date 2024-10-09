import React, {useEffect, useState} from 'react'
import {KanbanCard, KanbanColumn} from '../components/index'
import { useParams } from 'react-router'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useKanbanContext } from '../context/KanbanContext'
import { v4 as uuidv4 } from 'uuid';
import {Modal} from '../components'



function KanbanUI() {
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    done: []
  });
  const [loading, setLoading] = useState(false)
  const {projectId} = useParams();
  const {supabase} = useKanbanContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
      setIsOpen(!isOpen)
  }

  // const [initialColumns, setInitialColumns] = useState({
  //   todo: [],
  //   inProgress: [], 
  //   done: []
  // })
  const [title, setTitle] = useState('')

  const [taskForm, setTaskForm] = useState({
    taskName: '', 
    taskDesc: ''
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
    const {data, error} = await supabase.from('project_list').select('id, project_name, project_description, project_task!inner(task_id, task_status, task_desc, task_title)').eq('project_task.project_id', projectId)
    // console.log(data);
    if(!data){ return setColumns({
      todo: [], 
      inProgress: [], 
      done: []
    })}
      if(data.length === 0) {
        const {data, error} = await supabase.from('project_list').select('id, project_name, project_description').eq('id', projectId);
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
    const {data, error} = await supabase.from('project_task').insert({'task_id': uuidv4(), 'project_id': projectId, 'task_status': 'todo', 'task_desc': taskForm.taskDesc, 'task_title': taskForm.taskName }).select();
    if(error) window.alert(error);
    let newObj = {

    }
    setColumns({...columns, todo: [...columns.todo, data[0]]})
    if(data) toggleModal();
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

  if(loading) return (<>Loading...</>)

  return (
    <div>
      <section className='flex flex-row justify-center'>

    <h1 className='text-3xl self-center'>{title ? title : <></>}</h1>
    <Modal  isOpen={isOpen} toggleModal={toggleModal}>

      <section>
        <h2>Add A Task</h2>
        <input onChange={(e) => setTaskForm({...taskForm, taskName: e.target.value})}  placeholder='task title' />
        <input onChange={(e) => setTaskForm({...taskForm, taskDesc: e.target.value})} placeholder='task description' />
        <button onClick={insertNewTask}>Submit</button>
      </section>
    </Modal>
      </section>
      <DragDropContext
        enableStrictMode
        onDragEnd={onDragEnd}
      >
        <div className='flex justify-evenly items-stretch p-4  '> 
          {columns ? Object.entries(columns).map(([columnId, tasks], index) => (
            <Droppable 

              key={columnId}
              droppableId={columnId}
            >
              {(provided) => (
               <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='w-[100%] p-2 flex items-stretch'
               >

                  <KanbanColumn
                    // innerRef={provided.innerRef}
                    // {...provided.droppableProps}
                    title={columnId}
                  >
                    {
                      tasks.map((task, taskIndex) => (
                        <Draggable   key={task["task_id"]} draggableId={`${task["task_id"]}-${taskIndex}`} index={taskIndex} >
                          {(provided) => (
                            <div
                            className='w-[100%]'
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <KanbanCard handleDelete={handleDelete} text={task} />

                            </div>
                          )}
                        </Draggable>
                      ))
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