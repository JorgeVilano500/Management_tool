import React, {Children, useState} from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { BiExit } from 'react-icons/bi';

function Modal(props) {



  return (
    <div className='flex'>

        {/* Button triggering modal */}
        <button onClick={props.toggleModal} className='text-slate-200 self-center bg-slate-800 px-2 py-1 transition ease-in hover:text-slate-500 hover:bg-slate-200  rounded-[1rem]'>
            {/* <CiSquarePlus className='w-[2rem] h-[2rem] ' /> */}
            Create New {props.task}
        </button>
        

        {/* modal backdrop */}
        {props.isOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex lg:flex-col items-center justify-center z-50">
                {/* modal content */}
                <div className='bg-white rounded-lg relative shadow-lg xs:w-[auto] lg:w-1/3   p-6'>
                    <button className='bg-red-500 absolute right-0 top-0  text-white px-3 py-1 rounded' onClick={props.toggleModal}><BiExit /></button>
                    {props.children}


                    {/* close button */}

                </div>

                </div>
        )}

    </div>
  )
}

export default Modal