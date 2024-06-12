import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const LoginButton = ({}) => {

  const {ethereum} = window;

  const [account, setAccount] = useState("");

  const navigate = useNavigate()


  const connectMetamask = async () => {
    if(window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      navigate('/pledge')
    }
  }

  //connectcontract buraya gelirse düzelir , -> eksikler msg.value kullanıcı istediği kadar gönderbilmeli
  
  if(account) {
    return (
      <div className='flex flex-col text-[20px] font-bold top-0 left-0'>
        Your wallet connect successfully <p className=' font-bold text-orange-500'>{account}</p>
      </div>
    )
  }

  return (
    <div className='border-2 border-white bg-white/10 flex justify-center items-center mx-auto gap-4 hover:cursor-pointer bg-black/50 hover:bg-black/70 border-2 shadow-xl border-black rounded-[16px] mt-10 text-white text-[20px] font-semibold w-[400px] h-[70px]' onClick={connectMetamask}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg' className='w-[50px]' />
        Connect Metamask Wallet
      
    </div>
  )
}

export default LoginButton