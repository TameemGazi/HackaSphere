import React from 'react';
import './SponsorView.css';

const SponsorView = ({ hackathons, onSponsorClick }) => {
  return (
    <div className="hackathon-list">
      <h2>-:Hackathons:-</h2>
      {hackathons.length === 0 ? (
        <p>No hackathons submitted yet.</p>
      ) : (
        hackathons.map((hackathon, index) => (
          <div key={index} className="hackathon-item">
            <h3>{hackathon.name}</h3>
            <p>{hackathon.description}</p>
            <p><strong>Start Date:</strong> {hackathon.startDate}</p>
            <p><strong>End Date:</strong> {hackathon.endDate}</p>
            <p><strong>Target Amount:</strong> {hackathon.targetAmount} ETH</p>
            <p><strong>Wallet Address:</strong> {hackathon.walletAddress} ETH</p>
            <button onClick={() => onSponsorClick(hackathon)}>Sponsor</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SponsorView;
