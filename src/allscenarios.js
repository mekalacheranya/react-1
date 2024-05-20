// AllScenarios.js

import React, { useState, useContext, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import './allscenarios.css';
import { ScenarioContext } from './ScenarioContext';
import AddVehicleTab from './addvehicles.js';

const AllScenarios = () => {
  const { scenarios, setScenarios } = useContext(ScenarioContext);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedScenario, setEditedScenario] = useState(null);
  const [showAddVehicle, setShowAddVehicle] = useState(false); // State for showing Add Vehicle tab

  const handleEdit = (index) => {
    setEditableIndex(index);
    setEditedScenario({ ...scenarios[index] });
  };

  const handleAddScenario = () => {
    const newScenario = {
      scenarioName: '',
      scenarioTime: '',
      vehicles: []
    };
    setScenarios([...scenarios, newScenario]);
  };

  const handleAddVehicleClick = () => {
    setShowAddVehicle(true); // Set showAddVehicle to true when the button is clicked
  };

  const handleSave = (index) => {
    const updatedScenarios = [...scenarios];
    updatedScenarios[index] = editedScenario;
    sessionStorage.setItem('scenarios', JSON.stringify(updatedScenarios));
    setScenarios(updatedScenarios);
    setEditableIndex(null);
    console.log('Scenario saved at index:', index);
  };

  const handleCancel = () => {
    setEditableIndex(null);
  };

  const handleChange = (field, value) => {
    setEditedScenario({ ...editedScenario, [field]: value });
  };

  const handleDelete = (index) => {
    const updatedScenarios = scenarios.filter((_, i) => i !== index);
    sessionStorage.setItem('scenarios', JSON.stringify(updatedScenarios));
    setScenarios(updatedScenarios);
    console.log('Scenario deleted at index:', index);
  };

  const handleDeleteAll = () => {
    sessionStorage.removeItem('scenarios');
    setScenarios([]);
  };

  useEffect(() => {
    console.log('Scenarios:', scenarios); // Log scenarios to debug
  }, [scenarios]);

  return (
    <div>
      {!showAddVehicle && (
        <div>
          <h1>All Scenarios</h1>
          <div className="button-container">
            <button className="delete-all" onClick={handleDeleteAll}>Delete All</button>
            <button className="add-vehicle" onClick={handleAddVehicleClick}>Add Vehicle</button>
            <button className="add-scenario" onClick={handleAddScenario}>New Scenario</button>
          </div>
          <table className="scenario-table">
            <thead>
              <tr>
                <th className="table-header">Scenario ID</th>
                <th className="table-header">Scenario Name</th>
                <th className="table-header">Scenario Time</th>
                <th className="table-header">Number of Vehicles</th>
                <th className="table-header">Edit</th>
                <th className="table-header">Delete</th>
              </tr>
            </thead>
            <tbody>
              {scenarios && scenarios.length > 0 ? (
                scenarios.map((scenario, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {editableIndex === index ? (
                        <input
                          type="text"
                          value={editedScenario.scenarioName}
                          onChange={(e) => handleChange('scenarioName', e.target.value)}
                        />
                      ) : (
                        scenario.scenarioName
                      )}
                    </td>
                    <td>
                      {editableIndex === index ? (
                        <input
                          type="text"
                          value={editedScenario.scenarioTime}
                          onChange={(e) => handleChange('scenarioTime', e.target.value)}
                        />
                      ) : (
                        scenario.scenarioTime
                      )}
                    </td>
                    <td>{(scenario.vehicles || []).length}</td>
                    <td>
                      {editableIndex === index ? (
                        <>
                          <FaSave className="icon-black" onClick={() => handleSave(index)} />
                          <FaTimes className="icon-black" onClick={handleCancel} />
                        </>
                      ) : (
                        <FaEdit className="icon-black" onClick={() => handleEdit(index)} />
                      )}
                    </td>
                    <td>
                      {editableIndex === index ? (
                        null
                      ) : (
                        <FaTrashAlt className="icon-black" onClick={() => handleDelete(index)} />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No scenarios available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {showAddVehicle && <AddVehicleTab />}
    </div>
  );
};

export default AllScenarios;
