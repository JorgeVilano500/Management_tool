import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex flex-row justify-center h-[3rem] bg-slate-500 items-center'>
        
        <Link className='mx-3 border-transparent rounded p-1  transition ease-in hover:border-[1px] hover:bg-slate-200 hover:border-slate-200' to={'/'}>Home</Link>
        <Link className='mx-3 border-transparent rounded p-1  transition ease-in hover:border-[1px] hover:bg-slate-200 hover:border-slate-200' to={'/'}>Past Projects</Link>
    </div>
  )
}

export default Navbar