import { useEffect, useRef } from "react";

function TaskModal({openModal, closeModal, children}) {
    const ref = useRef();
  
    
    useEffect(() => {
        if(openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal])

    return (
        <dialog
            ref={ref}
            onCancel={closeModal} 
            className="p-16 relative "
        >
            <button className="left-2 absolute top-2  bg-red-500 p-1 text-white transition ease-in-out hover:bg-red-200 hover:text-black" onClick={closeModal}>Close</button>
            {children}
        </dialog>

    )

}

export default TaskModal;