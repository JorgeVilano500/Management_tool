import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router-dom';
import{ LandingPage, KanbanUI, LoginPage} from './pages';
import {useKanbanContext} from './context/KanbanContext';
import { Navbar, Footer } from './components';



function App() {
  const [count, setCount] = useState(0)

  const {projects, supabase, setProjects, priorities, displayName, addProjectSupabase, userInfo} = useKanbanContext();
  



  return (
    <body className='min-h-[100vh] flex flex-col'>
      <Navbar
        userInfo={userInfo}
        displayName={displayName}
        addProjectSupabase={addProjectSupabase}
        />
    
      <Routes>
        <Route path='/' element={<LandingPage userInfo={userInfo} projectList={projects} supabase={supabase} setProjects={setProjects} priorities={priorities} />} />
        <Route path='/:projectId' element={<KanbanUI />} />
        <Route path='/login' element={<LoginPage supabase={supabase} />} />

      </Routes>
      <Footer />

    </body>
  )
}

export default App


