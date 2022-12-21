import WrongNetworkMessage from "../components/WrongNetworkMessage";
import ConnectWalletButton from "../components/ConnectWalletButton";
import TodoList from "../components/TodoList";
import { checkConnection } from "../hooks/useWeb3";
import { useEffect, useState } from "react";
import Web3 from "web3";
/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [isMetaMaskFound, setIsMetaMaskFound] = useState(false);
  const [eth, setEth] = useState({});
  const [account, setAccounts] = useState({});
  const [web3Setup,setWeb3Setup]=useState({})
  useEffect(()=>{
    let provider=window.ethereum
    provider && provider.on('accountsChanged',account=>{
    console.log(account)
    setAccount(account[0])
  })
  provider &&  provider.on('chainChanged', (chainId) => {
    window.location.reload();
  });
},[])

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  useEffect(() => {
    let web3 = new Web3(window.ethereum);
    setWeb3Setup(web3)
    getConnection();
  }, [1]);
  const getConnection = async () => {
    try {
      let a = await checkConnection(window.ethereum);
      setEth(window.ethereum);
      
      if (!a.error) {
        if(a.msg=="Connected to Ganashe"){
          setIsConnected(false)
          setIsMetaMaskFound(false)
          alert("Connect Genashe and reload")
        }
        else{
          console.log(a)
          setAccounts(a.accounts)
          setIsConnected(true)
        }
      }
      else{

      }
      
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
   // let accounts = await eth.request({ method: "eth_requestAccounts" });
    console.log(accounts);
  };

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {
    console.log(web3)
let ac=await web3Setup.eth.getAccounts()

console.log(ac)
    
  };
getAllTasks(web3)
  // Add tasks from front-end onto the blockchain
  const addTask = async (e) => {};

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = (key) => async () => {};

  return (
    <div className="bg-[#97b5fe] h-screen w-screen flex justify-center py-6">
      {!isMetaMaskFound ? (
        !isConnected ? (
          <ConnectWalletButton connectWallet={connectWallet} />
        ) : "is this the correct network?" ? (
          <TodoList account={account} />
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
