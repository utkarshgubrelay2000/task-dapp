import axios from "axios";
import { useState,useEffect } from "react";
import Web3 from "web3";

 const useProvider=()=>{
      const [web3Setup,setWeb3Setup]=useState(null)
      const useWeb3=(provider)=>{
        let web3 = new Web3(provider);
       
        return web3
    }

    const chainChanged=(provider)=>{
        provider && provider.on('accountsChanged',account=>{
          //  console.log(account)
            setAccount(account[0])
          })
          provider &&  provider.on('chainChanged', (chainId) => {
            window.location.reload();
          });
    }
  return    {
useWeb3,
chainChanged,

  }

}
export default useProvider