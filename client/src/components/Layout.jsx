import React from 'react'
import LoginButton from './LoginButton'
import { useContract } from '../hooks/useContract'

const Layout = ({children}) => {

  useContract()

  const buttonClassName = "bg-white width-auto  p-2 font-semibold rounded-[10px] text-center "
  return (
    <div className='flex flex-col items-center h-screen  w-full bg-gradient-to-br from-black  to-black/90 '>
      <div className='flex p-5 justify-center mb-[90px] bg-gray-300/10 w-full space-x-20'>
          <button onClick={() => window.location.replace('http://localhost:3000/buy')} className={buttonClassName}>Buy Container</button>
          <button onClick={() => window.location.replace('http://localhost:3000/pledge')} className={buttonClassName}>Pledge Container</button>
          <button onClick={() => window.location.replace('http://localhost:3000/unpledge  ')} className={buttonClassName}>Unpledge Container</button>
      </div>
        {children}
    </div>
  )
}

export default Layout