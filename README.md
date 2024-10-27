# Setup the project using in both client and w3_s

```sh
yarn install
npm install
npm start
```
Add this HACKSP token as manually into your wallet on AIA Chain

Contract Address = 0xDe475e59B06c6dDf7797361C99ED22FCeFDDD125

Verify this Contract -> [Verify HACKSP](https://testnet.aiascan.com/token/0xDe475e59B06c6dDf7797361C99ED22FCeFDDD125)

---

# About HackSponsor (build on AIA chain)
## Intro
This project is a Hackathon Sponsorship Platform that allows users to host hackathons and sponsor them using HACKSP tokens, leveraging Web3 technology for seamless blockchain interactions.
## Detailed Intro
The Hackathon Sponsorship Platform is a decentralized application (dApp) designed to connect hackathon organizers with potential sponsors, enabling secure and transparent funding for hackathon events using blockchain technology. Built with React and Web3, this platform offers a streamlined interface where users can either host or sponsor hackathons by interacting with the AIA blockchain.

Key Features:
Host Hackathons: Organizers can initiate hackathons by filling out a form with details like event name, description, and funding wallet address.
Sponsor Hackathons: Potential sponsors can view available hackathons and sponsor them directly in HACKSP tokens, transferring funds securely through a smart contract on the blockchain.
Wallet Integration: The platform integrates with MetaMask, allowing users to connect their wallets and manage sponsorship transactions securely.
Real-time Account Updates: The application listens for account changes in MetaMask, updating the connected wallet address dynamically.
Technology Stack:
Frontend: React for the user interface, allowing dynamic tab switching between "Host" and "Sponsor" views.
Blockchain Interaction: Web3.js and Ethers.js are used to connect with the Ethereum blockchain, manage wallet connections, and handle HACKSP token transfers.
Smart Contracts: Sponsorship transactions are processed on-chain using a custom smart contract deployed on Ethereum, ensuring transparency and traceability.
This platform simplifies the process of hackathon sponsorship, creating a seamless and secure way to support innovation in the blockchain community.
