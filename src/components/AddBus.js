import React, { useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../config';

function AddBus() {
  const [busData, setBusData] = useState({
    busName: '',
    busCapability: undefined,
    busNumber: '',
    status: true,
    id: 0,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/add/bus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...busData, "busCapability": parseInt(busData.busCapability)})
      });

      if (response.ok) {
        setMessage('Bus added successfully!');
        setBusData({
          busName: '',
          busCapability: '',
          busNumber: '',
          status: true
        });
      } else {
        setMessage('Failed to add bus. Please try again.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="add-bus-container">
      <h2>Add New Bus</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="busName">Bus Name:</label>
          <input
            type="text"
            id="busName"
            name="busName"
            value={busData.busName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="busCapability">Bus Capacity:</label>
          <input
            type="number"
            id="busCapability"
            name="busCapability"
            value={busData.busCapability}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="busNumber">Bus Number:</label>
          <input
            type="text"
            id="busNumber"
            name="busNumber"
            value={busData.busNumber}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Bus</button>
      </form>
    </div>
  );
}

export default AddBus;