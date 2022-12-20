export const checkConnection= async (eth)=>{
    console.log('worked')
 
    
if(eth){
    let chainId=await eth.request({method:"eth_chainId"})
    if(chainId=='0x539'){
        let accounts=await eth.request({method:"eth_requestAccounts"})
        return {error:false,msg:"",chainId,accounts:accounts[0]}
    }
    else{
        return {error:false,msg:"Connected to Ganashe"}   
    }
}
else{
    return {error:true,msg:"Methamask not found"}
}

}
