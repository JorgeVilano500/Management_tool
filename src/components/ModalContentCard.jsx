 function ModalContentCard({text, setEditModal, editModal, editText, setEditText, loggedIn, editProject, taskId}) {
    return (
        // <!-- From Uiverse.io by gharsh11032000 --> 
<div className="card">
  <div className="content">
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 9V5H4V9H20ZM20 11H4V19H20V11ZM3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM5 12H8V17H5V12ZM5 6H7V8H5V6ZM9 6H11V8H9V6Z"
      ></path>
    </svg>
    <p onDoubleClick={() => setEditModal(!editModal)} className="para">
        {editModal && loggedIn ? (
          <form onSubmit={(e) => {
            e.preventDefault();
            editProject( taskId, editText)
            setEditModal(!editModal)
          }} >
              <textarea rows={10} cols={30} className="text-gray-400" value={editText} onChange={(e) => {setEditText(e.currentTarget.value)}} />
            {/* <input /> */}
              <button className='bg-red-500 border border-transparent rounded sm:mt-2 sm:w-[50%] lg:w-[25%] m-auto py-1 text-white transition ease-in hover:bg-red-900 hover:border-black hover:border-[1px]  ' type='submit'  >Submit</button>
          </form>
        ) : (<p>{editText ? editText : text}</p>)}
    </p>
  </div>
</div>

    )
}

export default ModalContentCard