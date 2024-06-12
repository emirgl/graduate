
import { ethers } from 'ethers';
import { contractAddress } from '../ABI/contractAddress';
import { contractABI } from './contract';

export const prepareContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress,contractABI,signer)
    return contract
}