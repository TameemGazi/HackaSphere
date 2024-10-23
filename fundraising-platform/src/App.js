import React, { useState, useEffect } from 'react';
import HackathonForm from './HackathonForm';
import SponsorView from './SponsorView';
import Web3 from 'web3';
import './App.css';
import hackSp from './contractAbi/hacksp.json';
import { ethers, BrowserProvider } from 'ethers';

const App = () => {
  const [hackathons, setHackathons] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState(null); // State to control active form

  const handleHackathonSubmit = (hackathon) => {
    setHackathons([...hackathons, hackathon]);
  };

  const handleSponsorClick = async (hackathon) => {
    if (!web3) {
      alert('Please connect your wallet first!');
      return;
    }
    const amount = prompt(`Enter the amount of HACKSP you want to sponsor for ${hackathon.name}`);
    if (amount) {
      handleSponsor(account, hackathon.walletAddress, amount);
      alert(`Successfully sponsored ${amount} HACKSP to ${hackathon.name}!`);
    }
  };

  const handleSponsor = async (fromAccount, toAccount, amount) => {
    // Your sponsor logic here (with ethers.js or web3.js)
    const contractAddress = '0xDe475e59B06c6dDf7797361C99ED22FCeFDDD125';
    const provider = new BrowserProvider(window.ethereum);

    const signer = await provider.getSigner()
    const hackSpContract = new ethers.Contract(contractAddress, hackSp.abi, signer)
    // mint();
    // console.log(amount, "========inside withdrawing========")

    await (await hackSpContract.mint(toAccount, ethers.parseUnits(amount.toString(), 18))).wait();

    alert(`Successfully sponsored ${amount} HACKSP tokens!`);
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.enable();
      setWeb3(web3Instance);
      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);
      setIsWalletConnected(true);
    } else {
      alert('You need to install MetaMask to use this feature.');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', function (accounts) {
        setAccount(accounts[0]);
      });
    }
  }, []);

  // Helper function to slice the wallet address
  const sliceWalletAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Hackathon Sponsorship Platform</h1>
        <button className="wallet-button" onClick={!isWalletConnected ? loadWeb3 : null}>
          {isWalletConnected ? sliceWalletAddress(account) : 'Connect Wallet'}
        </button>
      </header>

      <div className="buttons-container">
        {/* Host and Sponsor buttons */}
        <button className="tab-button" onClick={() => setActiveTab('host')}>
          Host Hackathon
        </button>
        <button className="tab-button" onClick={() => setActiveTab('sponsor')}>
          Sponsor Hackathon
        </button>
      </div>

      <div className="main-content">
        {/* Conditional rendering of forms based on selected tab */}
        {activeTab === 'host' && <HackathonForm onSubmit={handleHackathonSubmit} />}
        {activeTab === 'sponsor' && <SponsorView hackathons={hackathons} onSponsorClick={handleSponsorClick} />}
      </div>
    </div>
  );
};

export default App;
