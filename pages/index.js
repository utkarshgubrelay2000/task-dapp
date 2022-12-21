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
 const [task,setTask]=useState([])
  const {chainChanged,useWeb3,account,web3Setup,useContractLoader} = useProvider()
  useEffect(()=>{
    let provider=window.ethereum
    setprovider(provider)
    chainChanged(provider)
    useWeb3(provider)
    getConnection(provider)

},[])
const useContract=async ()=>{
  try {
    if(web3Setup){
     let a=await useContractLoader('TaskManager')
      setContract(a)
      console.log(a)
    }

  
} catch (error) {
     console.log(error) 
}
}
useEffect(()=>{
  if(web3Setup){
    useContract()
  }
   
},[web3Setup])
useEffect(()=>{
  if(contract){
    getAllTasks()
   }
   
},[contract])

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
    if(contract) {
    
     let tasks=await contract.methods.getMTasks().call()
    console.log(tasks)
    setTask(tasks)
    
    }
    
  };

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
          <TodoList addTask={addTask} task={task} account={account} />
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
