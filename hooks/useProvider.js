import axios from "axios";
import { useState,useEffect } from "react";
import Web3 from "web3";

 const useProvider=()=>{
      const [web3Setup,setWeb3Setup]=useState(null)
      const[account,setAccount]=useState("")
      const useWeb3=async(provider)=>{
        let web3 = new Web3(provider);
       let account=await web3.eth.getAccounts()
       setAccount(account)
       setWeb3Setup(web3)
        return web3
    }
   const useContractLoader=async(name)=>{
    if(web3Setup){

      let res=await axios.get(`/contracts/${name}.json`)
      res=res.data
      let ac2=res.abi
      let network=res.networks[5777].address
      let ac=new web3Setup.eth.Contract(ac2,network);
      return ac;
    }
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
account,web3Setup,
useContractLoader

  }

}
export default useProvider