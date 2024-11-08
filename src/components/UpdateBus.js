import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateBus() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [busData, setBusData] = useState({
    busNumber: '',
    route: '',
    driver: '',
    status: ''
  });

  useEffect(() => {
    fetchBusDetails();
  }, [id]);

  const fetchBusDetails = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(`http://your-api-url/buses/${id}`);
      setBusData(response.data);
    } catch (error) {
      console.error('Error fetching bus details:', error);
    }
  };

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
      await axios.put(`http://your-api-url/buses/${id}`, busData);
      navigate('/');
    } catch (error) {
      console.error('Error updating bus:', error);
    }
  };

  return (
    <div>
      <h2>Update Bus Details</h2>
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
        <button type="submit" className="btn btn-primary">Update Bus</button>
      </form>
    </div>
  );
}

export default UpdateBus; 