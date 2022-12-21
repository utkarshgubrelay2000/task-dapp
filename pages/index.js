import WrongNetworkMessage from "../components/WrongNetworkMessage";
import ConnectWalletButton from "../components/ConnectWalletButton";
import TodoList from "../components/TodoList";
import { checkConnection } from "../hooks/useWeb3";
import { useEffect, useState } from "react";

import useProvider from "../hooks/useProvider";
import axios from "axios";
/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [contract,setContract]=useState(null)
  const [isMetaMaskFound, setIsMetaMaskFound] = useState(false);
  const [provider, setprovider] = useState(null);
  const [account, setAccounts] = useState({});
  const [web3Setup,setWeb3Setup]=useState(null)
  
  const {chainChanged,useWeb3} = useProvider()
  useEffect(()=>{
    let provider=window.ethereum
    setprovider(provider)
    chainChanged(provider)
  setWeb3Setup(useWeb3(provider))
  
    getConnection(provider)

},[])
const useContract=async ()=>{
  try {
      
  
  let res=await axios.get('/contracts/TaskManager.json')
 res=res.data
 
  let ac2=res.abi
  let network=res.networks[5777].address
  let ac=new web3Setup.eth.Contract(ac2,network);
 setContract(ac)

  
} catch (error) {
     console.log(error) 
}
}
useEffect(()=>{
  useContract(web3Setup)
 getAllTasks()
   
},[web3Setup])

  // Calls Metamask to connect wallet on clicking Connect Wallet button

  const getConnection = async (provi) => {
    try {
      let a = await checkConnection(provi);
 
      if (!a.error) {
        if(a.msg=="Connected to Ganashe"){
          setIsConnected(false)
          setIsMetaMaskFound(false)
          alert("Connect Genashe and reload")
        }
        else{
        //  console.log(a)
          setAccounts(a.accounts)
       
          setIsConnected(true)
        }
      }
      else{
        setIsMetaMaskFound(true)

      }
      
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    if(provider){

      let accounts = await provider.request({ method: "eth_requestAccounts" });
     // console.log(accounts);
    }
  };

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {
    console.log(contract)
    if(web3Setup && contract) {
    
     let tasks=await contract.methods.getMTasks().call()
    console.log(tasks)
    
    }
    
  };
//getAllTasks()
  // Add tasks from front-end onto the blockchain
  const addTask = async (e) => {
if(contract){

  let tasks=await contract.methods.CreateTask("Hello").send({from:account})
  console.log(tasks)
}
  };

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = (key) => async () => {};

  return (
    <div className="bg-[#97b5fe] h-screen w-screen flex justify-center py-6">
      {!isMetaMaskFound ? (
        !isConnected ? (
          <ConnectWalletButton connectWallet={connectWallet} />
        ) : "is this the correct network?" ? (
          <TodoList  account={account} />
        ) : (
          <WrongNetworkMessage />
        )
      ) : (
        <button
          className="h-[5rem] text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out"
          // Add an onClick functionality
        >
          Install MetaMask
        </button>
      )}
    </div>
  );
}
