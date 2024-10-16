import React from 'react'

function ProgressBar({percent}) {
  return (
    <div className='w-full bg-gray-200 rounded-full h-6'>
        <div
            style={{width: `${percent}`}}
            className='bg-green-500 h-6 rounded-full'
        >
            <p className='text-center'>{percent}</p>
        </div>
    </div>
  )
}

export default ProgressBar