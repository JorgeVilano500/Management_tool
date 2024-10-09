import React, {Children, useState} from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { BiExit } from 'react-icons/bi';

function Modal(props) {



  return (
    <div>

        {/* Button triggering modal */}
        <button onClick={props.toggleModal} className=' px-4 py-2 rounded'>
            <CiSquarePlus className='w-[2rem] h-[2rem] hover:bg-slate-500' />
        </button>
        

        {/* modal backdrop */}
        {props.isOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                {/* modal content */}
                <div className='bg-white rounded-lg relative shadow-lg w-1/3 p-6'>
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