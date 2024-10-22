import React, { useState } from 'react';
import './HackathonForm.css';

const HackathonForm = ({ onSubmit }) => {
  const [hackathon, setHackathon] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    targetAmount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHackathon({ ...hackathon, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(hackathon);
    setHackathon({ name: '', description: '', startDate: '', endDate: '', targetAmount: '' });
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
        placeholder="Target Amount (ETH)"
        value={hackathon.targetAmount}
        onChange={handleChange}
        required
      />
      <button type="submit">Host Hackathon</button>
    </form>
  );
};

export default HackathonForm;
