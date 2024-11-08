import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BusList from './components/BusList';
import AddBus from './components/AddBus';
import UpdateBus from './components/UpdateBus';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<BusList />} />
            <Route path="/add-bus" element={<AddBus />} />
            <Route path="/update-bus/:id" element={<UpdateBus />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 