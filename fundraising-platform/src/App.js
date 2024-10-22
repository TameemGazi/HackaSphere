import React, { useState, useEffect } from 'react';
import HackathonForm from './HackathonForm';
import SponsorView from './SponsorView';
import Web3 from 'web3';
import './App.css';

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
    const amount = prompt(`Enter the amount of ETH you want to sponsor for ${hackathon.name}`);
    if (amount) {
      const valueInWei = web3.utils.toWei(amount, 'ether');
      await web3.eth.sendTransaction({
        from: account,
        to: '0xYourHackathonWalletAddress', // replace with actual address
        value: valueInWei,
      });
      alert(`Successfully sponsored ${amount} ETH to ${hackathon.name}!`);
    }
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

  return (
    <div className="app">
      <header className="header">
        <h1>Hackathon Sponsorship Platform</h1>
        {isWalletConnected ? (
          <p className="wallet-info">Wallet Connected: {account}</p>
        ) : (
          <button className="wallet-button" onClick={loadWeb3}>
            Connect Wallet
          </button>
        )}
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
