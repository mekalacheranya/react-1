import React, { useState, useContext, useEffect } from 'react';
import './addvehicles.css';
import { ScenarioContext } from './ScenarioContext';

const AddVehicles = () => {
  const [vehicleName, setVehicleName] = useState('');
  const [speed, setSpeed] = useState('');
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [direction, setDirection] = useState('');
  const [isValidPositionX, setIsValidPositionX] = useState(true);
  const [selectedScenario, setSelectedScenario] = useState('');
  const [allScenarios, setAllScenarios] = useState([]);

  const { scenarios, setScenarios } = useContext(ScenarioContext);

  useEffect(() => {
    const storedScenariosJSON = sessionStorage.getItem('scenarios');
    const storedScenarios = storedScenariosJSON ? JSON.parse(storedScenariosJSON) : [];
    
    // Combine and remove duplicates
    const combinedScenarios = [...storedScenarios, ...scenarios];
    const uniqueScenarios = combinedScenarios.filter((scenario, index, self) =>
      index === self.findIndex((s) => s.scenarioName === scenario.scenarioName)
    );

    setAllScenarios(uniqueScenarios);
    console.log('All Scenarios:', uniqueScenarios);
  }, [scenarios]);

  const handleAddVehicle = () => {
    if (positionX > 800) {
      setIsValidPositionX(false);
      return; // Stop execution if positionX is invalid
    }

    const newVehicle = {
      vehicleName,
      speed,
      positionX,
      positionY,
      direction,
    };

    const updatedScenarios = allScenarios.map((scenario) => {
      if (scenario.scenarioName === selectedScenario) {
        return {
          ...scenario,
          vehicles: [...(scenario.vehicles || []), newVehicle],
        };
      }
      return scenario;
    });

    // Store updated scenarios in session storage
    sessionStorage.setItem('scenarios', JSON.stringify(updatedScenarios));

    // Update state with the new scenarios list
    setScenarios(updatedScenarios);

    // Log the new vehicle and updated scenarios to the console
    console.log('New Vehicle:', newVehicle);
    console.log('Updated Scenarios:', updatedScenarios);

    // Reset form fields
    setVehicleName('');
    setSpeed('');
    setPositionX('');
    setPositionY('');
    setDirection('');
    setIsValidPositionX(true);
  };

  const handleReset = () => {
    // Reset all form fields
    setVehicleName('');
    setSpeed('');
    setPositionX('');
    setPositionY('');
    setDirection('');
    setIsValidPositionX(true);
  };

  const handleGoBack = () => {
    // Implement go back functionality here
    window.history.back();
  };

  return (
    <div className="add-vehicles-container">
      <h1>Add Vehicles</h1>
      <form className="vehicle-form">
        <div className="form-group scenario-group">
          <label htmlFor="scenario">Scenario:</label>
          <select
            id="scenario"
            name="scenario"
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e.target.value)}
          >
            <option value="">Select a scenario</option>
            {allScenarios.map((scenario) => (
              <option key={scenario.scenarioName} value={scenario.scenarioName}>
                {scenario.scenarioName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group vehicleName-group">
          <label htmlFor="vehicleName">Vehicle Name:</label>
          <input
            type="text"
            id="vehicleName"
            name="vehicleName"
            placeholder="Enter Vehicle Name"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
          />
        </div>
        <div className="form-group speed-group">
          <label htmlFor="speed">Speed:</label>
          <input
            type="number"
            id="speed"
            name="speed"
            placeholder="Enter Speed"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div className="form-group positionX-group">
          <label htmlFor="positionX">Position X:</label>
          <input
            type="number"
            id="positionX"
            name="positionX"
            placeholder="Enter Position X"
            value={positionX}
            onChange={(e) => {
              const newPositionX = parseInt(e.target.value, 10);
              setPositionX(newPositionX);
              setIsValidPositionX(newPositionX <= 800); // Update validation state
            }}
          />
          {!isValidPositionX && <p className="error-label">Position X cannot be greater than 800</p>}
        </div>
        <div className="form-group positionY-group">
          <label htmlFor="positionY">Position Y:</label>
          <input
            type="number"
            id="positionY"
            name="positionY"
            placeholder="Enter Position Y"
            value={positionY}
            onChange={(e) => setPositionY(e.target.value)}
          />
        </div>
        <div className="form-group direction-group">
          <label htmlFor="direction">Direction:</label>
          <select
            id="direction"
            name="direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="">Select direction</option>
            <option value="toward">Toward</option>
            <option value="backwards">Backwards</option>
            <option value="upwards">Upwards</option>
            <option value="downwards">Downwards</option>
          </select>
        </div>
        <div className="button-row">
          <button type="button" className="add-button" onClick={handleAddVehicle}>
            Add Vehicle
          </button>
          <button type="button" className="reset-button" onClick={handleReset}>
            Reset
          </button>
          <button type="button" className="go-back-button" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicles;
