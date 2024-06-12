import { ethers } from "ethers"

export const parseEther = (amount) => {
  return ethers.parseEther(amount)
}

export const formatEther = (amount="0") => {
   return ethers.formatEther(amount.toString())
}

export const convertTime = (blockTimeStamp) => {
    const jsDate = new Date(Number(blockTimeStamp) * 1000);
    return jsDate.toLocaleString()
}

export const containerEnums = (status) => {
  if(status == 0) return "Pledged"
  if(status == 1) return "Sold"
  if(status == 2) return "UnPledged"
}