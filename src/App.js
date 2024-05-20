import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import AddScenario from './addscenario';
import AllScenarios from './allscenarios'; // Import AllScenarios component
import AddVehicles from './addvehicles';
import { ScenarioProvider } from './ScenarioContext';
import './App.css';

function App() {
  return (
    <ScenarioProvider>
      <Router>
        <div className="app">
          {/* Sidebar */}
          <div className="sidebar">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/add-scenario">Add Scenario</a></li>
              <li><a href="/all-scenarios">All Scenarios</a></li> {/* New tab */}
              <li><a href="/add-vehicles">Add Vehicles</a></li> {/* New tab */}
              {/* Add links for other pages */}
            </ul>
          </div>
          {/* Main Content */}
          <div className="main-content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/add-scenario" element={<AddScenario />} />
              <Route path="/all-scenarios" element={<AllScenarios />} /> {/* New route */}
              <Route path="/add-vehicles" element={<AddVehicles />} /> {/* New route */}
              {/* Add routes for other pages */}
            </Routes>
          </div>
        </div>
      </Router>
    </ScenarioProvider>
  );
}

export default App;
