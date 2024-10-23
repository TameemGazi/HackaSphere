import React, { useState, useEffect } from 'react';
import './HackathonForm.css';

const HackathonForm = ({ onSubmit }) => {
  const [hackathon, setHackathon] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    targetAmount: '',
    walletAddress: ''
  });

  // Load stored form data from localStorage on component mount (if any)
  useEffect(() => {
    const storedHackathon = JSON.parse(localStorage.getItem('hackathonFormData'));
    if (storedHackathon) {
      setHackathon(storedHackathon);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHackathon({ ...hackathon, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call onSubmit with the hackathon details
    onSubmit(hackathon);

    // Store hackathon data in localStorage
    localStorage.setItem('hackathonFormData', JSON.stringify(hackathon));

    // Clear the form after submission
    setHackathon({ name: '', description: '', startDate: '', endDate: '', targetAmount: '', walletAddress: '' });
  };

  return (
    <form className="hackathon-form" onSubmit={handleSubmit}>
      <h2>Submit Hackathon</h2>
      <input
        type="text"
        name="name"
        placeholder="Hackathon Name"
        value={hackathon.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Hackathon Description"
        value={hackathon.description}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="startDate"
        value={hackathon.startDate}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="endDate"
        value={hackathon.endDate}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="targetAmount"
        placeholder="Target Amount (HACKSP)"
        value={hackathon.targetAmount}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="walletAddress"
        placeholder="Fund Wallet Address"
        value={hackathon.walletAddress}
        onChange={handleChange}
        required
      />
      <button type="submit">Host Hackathon</button>
    </form>
  );
};

export default HackathonForm;
