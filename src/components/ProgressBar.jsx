import React from 'react'

function ProgressBar({percent}) {
  return (
    <div className='w-full bg-gray-200 rounded-full h-2'>
        <div
            style={{width: `${percent}`}}
            className='bg-green-500 h-2 rounded-full'
        >
        </div>
        <section className='flex flex-row justify-between'>
            <p>Progress:</p>
            <p className='text-center'>{percent}</p>
        </section>
    </div>
  )
}

export default ProgressBar