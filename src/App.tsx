import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";

function App() {
  //const provider = new ethers.providers.Web3Provider(window.ethereum);
    //const signer = provider.getSigner()
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  let signer;

  let provider;
  const ConnectMetamask = async() => {
    
  
  if (window.ethereum == null) {

    // If MetaMask is not installed, we use the default provider,
    // which is backed by a variety of third-party services (such
    // as INFURA). They do not have private keys installed so are
    // only have read-only access
    console.log("MetaMask not installed; using read-only defaults")
    alert("Connection failed")

    } else {

    // Connect to the MetaMask EIP-1193 object. This is a standard
    // protocol that allows Ethers access to make all read-only
    // requests through MetaMask.
    provider = new ethers.BrowserProvider(window.ethereum)
    
    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user.
    signer = await provider.getSigner();
    const network = await provider.getNetwork();
    if(network.name !== 'goerli'){
      alert("Please switch to goerli testnet and then connect again")
    }
    else{
      alert("Connection done ")
    }
    console.log(network)
    }
  
  };

  const TransferButton = async() => {
    const network = await provider.getNetwork();
    console.log(network)
    if(network.name !== 'goerli'){
      alert("Please connnect to the network")
    }
    else{
      alert(`You are going to transfer : ${input1} goerli`);
    }
  

  if(signer!=null){
    let input3 = ethers.parseEther(input1)
    console.log(input3)
    signer.sendTransaction({
      to:input2,
      value:input3,
      
    })
  }
  console.log("asdaaf")
  
 
 

  };
  return (
    <div className="App">
      <button onClick={ConnectMetamask}>Connect MetaMask</button>
      <div>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="Enter Value in ETH"
        />
      </div>
      <div>
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Enter Receiver Address"
        />
      </div>{' '}
      <button onClick={TransferButton}>Tranasfer</button>
    </div>
  );
}

export default App;
