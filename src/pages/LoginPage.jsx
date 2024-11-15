import React, {useState} from 'react'
import { MdOutlineQuiz, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaGooglePlusG, FaGithub, FaMicrosoft } from "react-icons/fa";
import { useKanbanContext } from '../context/KanbanContext';




function LoginPage({supabase}) {
    const [registered, setRegistered] = useState(false);
    const {signOut, loggedIn, loginInfo, handleLoginChange, handleLoginFetch, createUserFetch} = useKanbanContext();

    const handleRegisterChange = () => {
        setRegistered(!registered);
    }
   
  return (<>
    {loggedIn ?
        // log out button 
    <section className='w-[35%] text-center mx-auto my-6 flex flex-col bg-slate-300 h-[25rem] justify-center gap-4'>
        <h3>Thank you for taking the time of checking out this website! <br /> Please come again!</h3>
        <button className='bg-slate-500 w-[25%] mx-auto py-1 px-2 rounded  shadow-slate-400 shadow-lg transition ease-in hover:bg-slate-300 hover:text-slate-500' onClick={(e) => signOut(e)} >Log Out</button>
    </section> :
        // log in form 
    registered ?
    <div  className='w-[35%] text-center  mx-auto my-6 flex flex-col bg-slate-300 h-[25rem] justify-center gap-4'>

        <form onSubmit={(e) => handleLoginFetch(e)} className='flex flex-col gap-3 '>
        <MdOutlineQuiz className='mx-auto h-[5rem] w-[5rem]' />
        <section>
            <h3 className='text-2xl font-semibold'>Welcome Back!</h3>
            <p className='text-slate-500 text-sm'>Login to your account</p>
        </section>
        <section className='flex flex-row bg-slate-50 w-[50%] mx-auto p-1 '>
            <MdEmail className='self-center mx-1' />
            <input name='email' id='email' onChange={(e) => {handleLoginChange(e)}} className='bg-slate-50 hover:border-none focus:border-none outline-none active:border-none  ' placeholder='Email'  />
        </section>
        
        <section className='flex flex-row bg-slate-50 w-[50%] mx-auto p-1 '>
            <RiLockPasswordFill className='self-center mx-1' />
            <input name='passowrd' id='password' onChange={(e) => {handleLoginChange(e)}} className='bg-slate-50 hover:border-none focus:border-none outline-none active:border-none  ' placeholder='Password'  />
        </section>

        <section className='flex flex-row justify-around w-[55%] mx-auto'>
            <div className='flex flex-row'>
                <input className='mx-1 self-center ' name='rememberUser' type='checkbox' />
                <label className='self-center' for='rememberUser'>Remember me?</label>
            </div>
            <button type='submit' className='bg-slate-400 py-1 px-4 transition ease-in hover:bg-slate-600 hover:text-slate-200'>Sign In</button>
        </section>
    </form>

        <section>
            <p>OR</p>
            <button onClick={handleRegisterChange}>Register</button>
        </section>
        <section className='flex flex-row justify-center gap-4 '>
            <FaGooglePlusG className='w-[2.5rem] h-[2.5rem] bg-slate-500 p-2 rounded-xl transition ease-in hover:bg-slate-200 hover:text-slate-800 hover: '  />

            <FaGithub className='w-[2.5rem] h-[2.5rem] bg-slate-500 p-2 rounded-xl transition ease-in hover:bg-slate-200 hover:text-slate-800 hover: '  />

            <FaMicrosoft className='w-[2.5rem] h-[2.5rem] bg-slate-500 p-2 rounded-xl transition ease-in hover:bg-slate-200 hover:text-slate-800 hover: '  />

        </section>

    </div>
        : 
        // logout form
        <div  className='w-[35%] text-center  mx-auto my-6 flex flex-col bg-slate-300 h-[25rem] justify-center gap-4'>

        <form onSubmit={(e) => createUserFetch(e)} className='flex flex-col gap-3'>
        <MdOutlineQuiz className='mx-auto h-[5rem] w-[5rem]' />
        <section>
            <h3 className='text-2xl font-semibold'>Welcome Back!</h3>
            <p className='text-slate-500 text-sm'>Register your account</p>
        </section>
        <section className='flex flex-row bg-slate-50 w-[50%] mx-auto p-1 '>
            <MdEmail className='self-center mx-1' />
            <input name='email' id='email' onChange={(e) => {handleLoginChange(e)}} className='bg-slate-50 hover:border-none focus:border-none outline-none active:border-none  ' placeholder='Email'  />
        </section>
        
        <section className='flex flex-row bg-slate-50 w-[50%] mx-auto p-1 '>
            <RiLockPasswordFill className='self-center mx-1' />
            <input name='passowrd' id='password' onChange={(e) => {handleLoginChange(e)}} className='bg-slate-50 hover:border-none focus:border-none outline-none active:border-none  ' placeholder='Password'  />
        </section>

        <section className='flex flex-row justify-around w-[55%] mx-auto'>
            <div className='flex flex-row'>
                <input className='mx-1 self-center ' name='rememberUser' type='checkbox' />
                <label className='self-center' for='rememberUser'>Remember me?</label>
            </div>
            <button type='submit' className='bg-slate-400 py-1 px-4 transition ease-in hover:bg-slate-600 hover:text-slate-200'>Register</button>
        </section>
    </form>
        
        <section>
            <p>OR</p>
            <button onClick={handleRegisterChange}>Sign In</button>
        </section>

        <section className='flex flex-row justify-center gap-4 '>
            <FaGooglePlusG className='w-[2.5rem] h-[2.5rem] bg-slate-500 p-2 rounded-xl transition ease-in hover:bg-slate-200 hover:text-slate-800 hover: '  />

            <FaGithub className='w-[2.5rem] h-[2.5rem] bg-slate-500 p-2 rounded-xl transition ease-in hover:bg-slate-200 hover:text-slate-800 hover: '  />

            <FaMicrosoft className='w-[2.5rem] h-[2.5rem] bg-slate-500 p-2 rounded-xl transition ease-in hover:bg-slate-200 hover:text-slate-800 hover: '  />

        </section>

        </div>
    }
    </>
    
  )
}

export default LoginPage