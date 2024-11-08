import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../config';

function BusList() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [editingBus, setEditingBus] = useState(null);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get/bus/details`);
      if (!response.ok) {
        throw new Error('Failed to fetch buses');
      }
      const data = await response.json();
      setBuses(data?.result);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEdit = (bus) => {
    setEditingBus({ ...bus });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.UPDATE_BUS, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editingBus,
          busCapability: parseInt(editingBus.busCapability)
        })
      });

      if (response.ok) {
        setMessage('Bus updated successfully!');
        setEditingBus(null);
        fetchBuses();
      } else {
        setMessage('Failed to update bus. Please try again.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleDelete = async (busId) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      try {
        const response = await fetch(`${API_ENDPOINTS.DELETE_BUS}/${busId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMessage('Bus deleted successfully!');
          fetchBuses();
        } else {
          setMessage('Failed to delete bus. Please try again.');
        }
      } catch (error) {
        setMessage('Error: ' + error.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="bus-list-container">
      <h2>Bus List</h2>
      {message && <div className="message">{message}</div>}
      <table className="bus-table">
        <thead>
          <tr>
            <th>Bus Name</th>
            <th>Bus Number</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses?.map((bus) => (
            <tr key={bus.id}>
              {editingBus && editingBus.id === bus.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editingBus.busName}
                      onChange={(e) => setEditingBus({...editingBus, busName: e.target.value})}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingBus.busNumber}
                      onChange={(e) => setEditingBus({...editingBus, busNumber: e.target.value})}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editingBus.busCapability}
                      onChange={(e) => setEditingBus({...editingBus, busCapability: e.target.value})}
                    />
                  </td>
                  <td>
                    <select
                      value={editingBus.status}
                      onChange={(e) => setEditingBus({...editingBus, status: e.target.value === 'true'})}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <button className="save-btn" onClick={handleUpdate}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditingBus(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{bus.busName}</td>
                  <td>{bus.busNumber}</td>
                  <td>{bus.busCapability}</td>
                  <td>{bus.status ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(bus)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(bus.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BusList;