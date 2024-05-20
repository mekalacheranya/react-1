import React, { useState, useContext } from 'react';
import { ScenarioContext } from './ScenarioContext';
import './addvehicles.css';

const AddScenario = () => {
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioTime, setScenarioTime] = useState('');
  const { setScenarios } = useContext(ScenarioContext);

  const handleAddClick = () => {
    if (!scenarioTime) {
      document.getElementById('scenarioTime').classList.add('error-border');
      alert("Please fill in the time.");
      return;
    }
    document.getElementById('scenarioTime').classList.remove('error-border');
    
    const scenario = {
      scenarioName,
      scenarioTime,
    };

    // Retrieve existing scenarios from session storage
    const existingScenariosJSON = sessionStorage.getItem('scenarios');
    const existingScenarios = existingScenariosJSON ? JSON.parse(existingScenariosJSON) : [];

    // Add the new scenario to the existing scenarios array
    const updatedScenarios = [...existingScenarios, scenario];

    // Store the updated scenarios array back into session storage
    sessionStorage.setItem('scenarios', JSON.stringify(updatedScenarios));

    // Update state with the new scenario
    setScenarios(updatedScenarios);

    console.log('Scenario stored:', scenario);
    setScenarioName('');
    setScenarioTime('');
    alert('Scenario added successfully!');
  };

  return (
    <div>
      <h1 className="scenario-add-heading">Scenario / add</h1>
      <h1>Add Scenario Page</h1>
      <div className="scenario-form">
        <div className="form-group">
          <div className="input-row">
            <div className="label-container white-label">
              <label htmlFor="scenarioName">Scenario Name:</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                id="scenarioName"
                name="scenarioName"
                placeholder="Enter Scenario Name"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="label-container white-label">
              <label htmlFor="scenarioTime">Scenario Time:</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                id="scenarioTime"
                name="scenarioTime"
                placeholder="Enter Scenario Time"
                value={scenarioTime}
                onChange={(e) => setScenarioTime(e.target.value)}
              />
            </div>
          </div>
          <div className="button-row">
            <button className="add-button" onClick={handleAddClick}>Add</button>
            <button className="reset-button" onClick={() => { setScenarioName(''); setScenarioTime(''); }}>Reset</button>
            <button className="go-back-button" onClick={() => window.history.back()}>Go Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScenario;
