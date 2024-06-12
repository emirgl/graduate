import React from 'react'
import { useState } from 'react'
import { contractInterface } from '../hooks/useContract'

const UnPledge = () => {

  const [form, setForm] = useState({})

  const unPledgeContainer = () => {
    const { containerId } = form
    contractInterface.unPledgeContainer(containerId)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value
    }
    ))
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-purple-300 mb-2 text-[50px]'>Unpledge Container</p>
      <p className='text-white mb-5 text-[20px]'>Only contract owner can reach that screen !</p>
      <p className='text-white mb-10 text-[20px]'>The condition is container must sold before unpledge process!</p>

      <div className='flex flex-col space-y-2'>
        <p className='text-white'>ContainerID</p>
        <input type='text' placeholder='container id' name='containerId' onChange={handleChange} className='w-[200px] h-[40px] .placeholder-blue-100 text-black block px-3 rounded-xl outline-none ' />
      </div>

      
      <button onClick={unPledgeContainer} className='bg-yellow-300 rounded-[16px] text-[20px] font-semibold mt-10 w-[200px] h-[50px] text-black'>Unpledge Container</button>
    </div>
  )
}

export default UnPledge