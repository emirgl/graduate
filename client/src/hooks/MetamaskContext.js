import { createContext, useContext, useState } from "react";

export const MetamaskContext = createContext(null)

export const MetamaskProvider = ({children}) => {

    const {ethereum} = window

    const [account, setAccount] = useState(localStorage.getItem('user') || ""); 

    if (ethereum) {
        ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                setAccount(accounts[0])
                localStorage.setItem('user',accounts[0])
            })
            .catch(error => {
                console.error("Error getting Ethereum accounts:", error);
            });
    } else {
        console.error("Ethereum not found. Please install MetaMask or a compatible wallet.");
    }

    return(
        <MetamaskContext.Provider 
            value={{
                account
            }}
        >
            {children}
        </MetamaskContext.Provider>

    )
}

export const useMetamask = () => useContext(MetamaskContext)