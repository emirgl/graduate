import React from 'react'
import { useState } from 'react'
import { contractInterface } from '../hooks/useContract'
const Pledge = () => {
 
  const [form, setForm] = useState({})

  const pledgeContainer = () => {
    contractInterface.pledgeContainer(form)
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
    <div className='flex flex-col items-center'>
      <p className='text-purple-300 mb-2 text-[50px]'>Pledge Container</p>
      <p className='text-white mb-10 text-[20px]'>Only contract owner can reach that screen !</p>

      <div className='flex flex-col space-y-2'>
        <p>Owner Address</p>
        <input type='text' placeholder='owner' name='owner' onChange={handleChange} className='w-[200px] h-[40px] .placeholder-blue-100 text-black block px-3 rounded-xl outline-none ' />
      </div>

      <div className='flex flex-col space-y-2'>
        <p>Receiver Address</p>
        <input type='text' placeholder='receiver' name='receiver' onChange={handleChange} className='w-[200px] h-[40px] block px-3 rounded-xl outline-none ' />
      </div>

      <div className='flex flex-col space-y-2'>
        <p>Price</p>
        <input type='text' placeholder='price(1.2)' name='price' onChange={handleChange} className='w-[200px] h-[40px] block px-3 rounded-xl outline-none ' />
      </div>

      <button onClick={pledgeContainer} className='bg-yellow-300 rounded-[16px] text-[20px] font-semibold mt-10 w-[200px] h-[50px] text-black'>Pledge Container</button>
    </div>
  )
}

export default Pledge