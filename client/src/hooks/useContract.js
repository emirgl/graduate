import { ethers, parseEther, parseUnits } from "ethers";
import { contractAddress } from "../ABI/contractAddress";
import { contractABI } from "../ABI/contractABI";
import { convertTime, formatEther, } from "./hooks"
import { useMetamask } from "./MetamaskContext";

let contract;
export const useContract = async () => {
  const { account } = useMetamask()
  if (account) {
    const { ethereum } = window;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  }
}

export const contractInterface = {}

contractInterface.pledgeContainer = async (form) => {
  const { owner, receiver, price } = form || {}

  try {
    const tx = await contract.pledgeContainer(owner, receiver, parseEther(price))
    const txData = await tx.wait()
    const logs = await txData.logs[0].args

    const response = await fetch("http://localhost:5000/containers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {
          pledgedTime: convertTime(logs[0].toString()),
          containerId: Number(logs[1]),
          owner: logs[2],
          receiver: logs[3],
          price: Number(logs[4]),
          containerStatus: Number(logs[5])
        }
      )
    })
    if (response.ok) window.location.replace('http://localhost:3000/buy')
  } catch (error) {
    if (error?.info?.error?.code) {
      alert(error?.info?.error?.data?.message)
      console.error(error?.info?.error?.data?.message)
    }
    else {
      console.error(error)
      alert("Something gone wrong!")
    }
  }
  return contract
}

contractInterface.unPledgeContainer = async (containerId) => {


  try {

    const tx = await contract.unPledgeContainer(containerId)
    const txData = await tx.wait()
    const logs = await txData.logs[0].args

    const response = await fetch(`http://localhost:5000/containers/${containerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {
          unpledgedTime: convertTime(Number(logs[1].toString())),
          containerStatus: Number(logs[2])

        }
      )
    })
    if (response.ok) window.location.replace('http://localhost:3000/buy')

  } catch (error) {
    if (error?.info?.error?.code) {
      alert(error?.info?.error?.data?.message)
      console.error(error?.info?.error?.data?.message)
    }
    else {
      console.error(error)
      alert("Something gone wrong!")
    }
  }
  return contract
}

contractInterface.buyContainer = async (containerId, price) => {

  try {
    const tx = await contract.buyContainer(containerId, { value: ethers.parseEther(price) })
    const txData = await tx.wait()
    const logs = await txData.logs[0].args

    console.log("i", logs)


    const response = await fetch(`http://localhost:5000/containers/${containerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {
          containerStatus: Number(logs[4])
        }
      )
    })
    if (response.ok) window.location.replace('http://localhost:3000/buy')

  } catch (error) {
    if (error?.info?.error?.code) {
      alert(error?.info?.error?.data?.message)
      console.error(error?.info?.error?.data?.message)
    }
    else {
      console.error(error)
      alert("Something gone wrong!")
    }
  }
}

