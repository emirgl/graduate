import React from 'react'
import LoginButton from '../components/LoginButton'

const Home = () => {
  return (
    <div className='flex flex-col items-center gap-y-10 text-white text-[30px] font-semibold'>
       World Wide Supply Chain Solutions
       <span className='text-[25px] text-yellow-300'>Connect Your Metamask wallet and start journey !</span>
       <LoginButton />
    </div>
  )
}

export default Home