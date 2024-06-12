import React, { useEffect, useState } from 'react'
import { contractInterface, useContract } from '../hooks/useContract'
import { containerEnums, formatEther } from '../hooks/hooks'

const BuyContainer = () => {

  const [form, setForm] = useState()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/containers')
    const data = await response.json()
    setData(data.response)
    if (data.response?.length == 0) setData(null)
    setLoading(true)
  }

  useEffect(() => {
    fetchData()
  }, [])


  const buyContainerFn = (containerId, price) => {
    contractInterface.buyContainer(containerId, price)
  }


  return (
    <div>
      <span className='flex  justify-center items-start mb-[10px]  text-white text-[30px]'>Container List</span>
      <span className='flex  justify-center items-start mb-[10px]  text-gray-400 text-[25px]'>Pick your container and request for unpledge!</span>

      <div className='flex flex-col h-auto bg-[#EEEEEE] p-10 rounded-[16px]'>

        <span className=' text-[#404040] text-[30px]  font-semibold mb-[20px]'>Container List</span>

        <table className='block overflow-auto'>
          {data === null && <span className='mt-10 text-red-600 font-semibold text-[20px] '>There is not exist any container!</span>}
          {data && (
            <>
              <thead>
                <tr>
                  <th>Container Id</th>
                  <th>Owner</th>
                  <th>Receiver</th>
                  <th>price</th>
                  <th>Status</th>
                  <th>pledged Time</th>
                  <th>Unpledged Time</th>
                </tr>
              </thead>
              <tbody className='h-auto text-[13px]'>
                {data.map((item, index) => (
                  <tr key={index} className='odd:bg-gray-400  font-semibold even:bg-red-100 h-[20px]'>
                    <td className='px-5'>{item.containerId}</td>
                    <td className='px-5'>{item.owner}</td>
                    <td className='px-5'>{item.receiver}</td>
                    <td className='px-2'>{formatEther(item.price)}</td>
                    <td className='px-2'>{containerEnums(item.containerStatus)}</td>
                    <td className='px-2'>{item.pledgedTime}</td>
                    <td className='px-2'>{item.unpledgedTime}</td>
                    <button onClick={() => buyContainerFn(item.containerId,formatEther(item.price))} className={`p-2 m-1 rounded-[8px] w-[130px] border-2 border-yellow-500 font-semibold hover:scale-y-110 bg-yellow-400 ${item.status === 0 || 1 ? `bg-gray-200`: ""}`}  >Buy Container</button>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>

    </div>
  )
}

export default BuyContainer