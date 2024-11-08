import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBus() {
  const navigate = useNavigate();
  const [busData, setBusData] = useState({
    busNumber: '',
    route: '',
    driver: '',
    status: 'Active'
  });

  const handleChange = (e) => {
    setBusData({
      ...busData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual API endpoint
      await axios.post('http://your-api-url/buses', busData);
      navigate('/');
    } catch (error) {
      console.error('Error adding bus:', error);
    }
  };

  return (
    <div>
      <h2>Add New Bus</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Bus Number</label>
          <input
            type="text"
            className="form-control"
            name="busNumber"
            value={busData.busNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Route</label>
          <input
            type="text"
            className="form-control"
            name="route"
            value={busData.route}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Driver</label>
          <input
            type="text"
            className="form-control"
            name="driver"
            value={busData.driver}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-control"
            name="status"
            value={busData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Bus</button>
      </form>
    </div>
  );
}

export default AddBus; 