import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BusList() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get('http://your-api-url/buses');
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  return (
    <div>
      <h2>Bus List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Bus Number</th>
            <th>Route</th>
            <th>Driver</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.busNumber}</td>
              <td>{bus.route}</td>
              <td>{bus.driver}</td>
              <td>{bus.status}</td>
              <td>
                <Link 
                  to={`/update-bus/${bus.id}`} 
                  className="btn btn-primary btn-sm me-2"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BusList; 