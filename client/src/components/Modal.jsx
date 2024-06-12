import React, { useState } from 'react'

export const Modal = ({ text, isError }) => {

    const [open, setOpen] = useState(true)
    if (open) {
        return (
            <dialog
                className="fixed  w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center" >
                <div className="bg-white m-auto px-10 py-5 rounded-xl">
                    <div className="flex flex-col gap-y-5 items-center">
                        <p className='text-[30px]'>Error !</p>
                        <p className='text-[24px]'>{text} </p>
                        <button type="button" onClick={() => setOpen(false)} className={`text-white p-2 text-[20px] rounded-md ${isError && `bg-black`} bg-green`} >Close</button>
                    </div>
                </div>
            </dialog> 
        )
    }
}

export default Modal
