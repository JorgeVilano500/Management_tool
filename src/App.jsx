import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router-dom';
import{ LandingPage, KanbanUI} from './pages';
import {useKanbanContext} from './context/KanbanContext';
import { Navbar } from './components';



function App() {
  const [count, setCount] = useState(0)

  const {projects, supabase, setProjects} = useKanbanContext();


  return (
    <>
      <Navbar />
    
      <Routes>
        <Route path='/' element={<LandingPage projectList={projects} supabase={supabase} setProjects={setProjects} />} />
        <Route path='/:projectId' element={<KanbanUI />} />

      </Routes>

    </>
  )
}

export default App


