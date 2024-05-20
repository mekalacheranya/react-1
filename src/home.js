import React, { useContext, useState, useEffect,useRef } from 'react';
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import { ScenarioContext } from './ScenarioContext';
import './allscenarios.css';
import Chart from 'chart.js/auto';
const Home = () => {
  const { scenarios, setScenarios } = useContext(ScenarioContext);
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [editableVehicleIndex, setEditableVehicleIndex] = useState(null);
  const [editedVehicle, setEditedVehicle] = useState(null);
  const [vehicleIdCounter, setVehicleIdCounter] = useState(1);
  const [showGraph, setShowGraph] = useState(false);
  const chartInstanceRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (scenarios && scenarios.length > 0) {
      let maxVehicleId = 1;
      scenarios.forEach(scenario => {
        if (scenario.vehicles && scenario.vehicles.length > 0) {
          scenario.vehicles.forEach(vehicle => {
            if (vehicle.vehicleId && vehicle.vehicleId >= maxVehicleId) {
              maxVehicleId = vehicle.vehicleId + 1;
            }
          });
        }
      });
      setVehicleIdCounter(maxVehicleId);
    }
  }, [scenarios]);
  useEffect(() => {
    if (showGraph && scenarios && scenarios[selectedScenarioIndex]) {
      renderChart();
      startSimulation();
    }
  }, [showGraph, selectedScenarioIndex, scenarios]);
  const renderChart = () => {
    const ctx = document.getElementById('vehicleChart').getContext('2d');
    const vehicles = scenarios[selectedScenarioIndex]?.vehicles;
    if (!vehicles || vehicles.length === 0) {
      return;
    }
    const chartData = {
      labels: vehicles.map((_, index) => `Vehicle ${index + 1}`),
      datasets: [{
        label: 'Vehicles',
        data: vehicles.map(vehicle => ({ x: vehicle.positionX, y: vehicle.positionY })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        pointRadius: 8,
        pointHoverRadius: 10,
        pointStyle: 'circle',
      }]
    };
    chartInstanceRef.current = new Chart(ctx, {
      type: 'scatter',
      data: chartData,
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Position X'
            }
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Position Y'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => `Vehicle ID: ${context.dataset.label} - (${context.parsed.x}, ${context.parsed.y})`
            }
          }
        }
      }
    });
  };
  const startSimulation = () => {
    const startTime = Date.now();
    const scenarioDuration = parseInt(scenarios[selectedScenarioIndex].scenarioTime) * 1000;
    const vehicles = scenarios[selectedScenarioIndex]?.vehicles;

    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (chartInstanceRef.current && elapsedTime < scenarioDuration) {
        // Update vehicle positions based on their speed and direction
        const updatedVehicles = vehicles.map(vehicle => {
          const speed = parseFloat(vehicle.speed);
          const direction = vehicle.direction.toLowerCase();
          const positionX = parseFloat(vehicle.positionX);
          const positionY = parseFloat(vehicle.positionY);

          let delta = elapsedTime / 1000; // Convert milliseconds to seconds
          if (direction === 'backwards' || direction === 'downwards') {
            delta = -delta; // Reverse direction for 'backwards' and 'downwards'
          }

          let newPositionX = positionX;
          let newPositionY = positionY;
          if (direction === 'upwards' || direction === 'downwards') {
            newPositionY += speed * delta; // Update Y position for 'upwards' and 'downwards'
          } else {
            newPositionX += speed * delta; // Update X position for 'leftwards' and 'rightwards'
          }

          return {
            ...vehicle,
            positionX: newPositionX,
            positionY: newPositionY
          };
        });

        // Update chart with new positions
        const updatedChartData = updatedVehicles.map(vehicle => ({ x: vehicle.positionX, y: vehicle.positionY }));
        chartInstanceRef.current.data.datasets[0].data = updatedChartData;
        chartInstanceRef.current.update();
      }

      if (elapsedTime < scenarioDuration) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const handleAddSimulation = () => {
    setShowGraph(true);
  };

  const handleStopSimulation = () => {
    cancelAnimationFrame(animationFrameRef.current); // Stop the animation
  };
  const handleScenarioChange = (e) => {
    setSelectedScenarioIndex(parseInt(e.target.value));
    setEditableVehicleIndex(null);
    setSelectedScenarioIndex(parseInt(e.target.value));
    setShowGraph(false);
    cancelAnimationFrame(animationFrameRef.current); // Reset editing state when scenario changes
  };

  const handleEdit = (vehicleIndex) => {
    setEditableVehicleIndex(vehicleIndex);
    setEditedVehicle({ ...scenarios[selectedScenarioIndex].vehicles[vehicleIndex] });
  };

  const handleDelete = (vehicleIndex) => {
    const updatedScenarios = scenarios.map((scenario, sIndex) => {
      if (sIndex === selectedScenarioIndex) {
        const updatedVehicles = scenario.vehicles.filter((_, vIndex) => vIndex !== vehicleIndex);
        return { ...scenario, vehicles: updatedVehicles };
      }
      return scenario;
    });
    sessionStorage.setItem('scenarios', JSON.stringify(updatedScenarios));
    setScenarios(updatedScenarios);
  };

  const handleSave = () => {
    const updatedScenarios = scenarios.map((scenario, sIndex) => {
      if (sIndex === selectedScenarioIndex) {
        const updatedVehicles = scenario.vehicles.map((vehicle, vIndex) => {
          if (vIndex === editableVehicleIndex) {
            return editedVehicle;
          }
          return vehicle;
        });
        return { ...scenario, vehicles: updatedVehicles };
      }
      return scenario;
    });
    sessionStorage.setItem('scenarios', JSON.stringify(updatedScenarios));
    setScenarios(updatedScenarios);
    setEditableVehicleIndex(null);
    setEditedVehicle(null);
  };

  const handleCancel = () => {
    setEditableVehicleIndex(null);
    setEditedVehicle(null);
  };

  const handleChange = (field, value) => {
    setEditedVehicle({ ...editedVehicle, [field]: value });
  };

  const getVehicleId = (vehicleIndex) => {
    const vehicle = scenarios[selectedScenarioIndex].vehicles[vehicleIndex];
    if (!vehicle.vehicleId) {
      vehicle.vehicleId = vehicleIdCounter;
      setVehicleIdCounter(vehicleIdCounter + 1);
    }
    return vehicle.vehicleId;
  };

  const renderVehicles = () => {
    const vehicles = scenarios[selectedScenarioIndex]?.vehicles;
    if (!vehicles || vehicles.length === 0) {
      return (
        <tr>
          <td colSpan="8">No vehicles available</td>
        </tr>
      );
    }
    return vehicles.map((vehicle, vehicleIndex) => (
      <tr key={vehicleIndex}>
        <td>{getVehicleId(vehicleIndex)}</td>
        <td>
          {editableVehicleIndex === vehicleIndex ? (
            <input
              type="text"
              value={editedVehicle.vehicleName}
              onChange={(e) => handleChange('vehicleName', e.target.value)}
            />
          ) : (
            vehicle.vehicleName
          )}
        </td>
        <td>
          {editableVehicleIndex === vehicleIndex ? (
            <input
              type="text"
              value={editedVehicle.positionX}
              onChange={(e) => handleChange('positionX', e.target.value)}
            />
          ) : (
            vehicle.positionX
          )}
        </td>
        <td>
          {editableVehicleIndex === vehicleIndex ? (
            <input
              type="text"
              value={editedVehicle.positionY}
              onChange={(e) => handleChange('positionY', e.target.value)}
            />
          ) : (
            vehicle.positionY
          )}
        </td>
        <td>
          {editableVehicleIndex === vehicleIndex ? (
            <input
              type="text"
              value={editedVehicle.speed}
              onChange={(e) => handleChange('speed', e.target.value)}
            />
          ) : (
            vehicle.speed
          )}
        </td>
        <td>
          {editableVehicleIndex === vehicleIndex ? (
            <input
              type="text"
              value={editedVehicle.direction}
              onChange={(e) => handleChange('direction', e.target.value)}
            />
          ) : (
            vehicle.direction
          )}
        </td>
        <td>
          {editableVehicleIndex === vehicleIndex ? (
            <>
              <FaSave className="icon-black" onClick={handleSave} />
              <FaTimes className="icon-black" onClick={handleCancel} />
            </>
          ) : (
            <FaEdit className="icon-black" onClick={() => handleEdit(vehicleIndex)} />
          )}
        </td>
        <td>
          <FaTrashAlt className="icon-black" onClick={() => handleDelete(vehicleIndex)} />
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <label htmlFor="scenario-select">Select Scenario: </label>
        <select id="scenario-select" value={selectedScenarioIndex} onChange={handleScenarioChange}>
          {scenarios.map((scenario, index) => (
            <option key={index} value={index}>
              {scenario.scenarioName}
            </option>
          ))}
        </select>
      </div>
      <table className="scenario-table">
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Vehicle Name</th>
            <th>Position X</th>
            <th>Position Y</th>
            <th>Speed</th>
            <th>Direction</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {renderVehicles()}
        </tbody>
      </table>
      <button className="start-button" onClick={handleAddSimulation}>Start Simulation</button>
      <button className="stop-button" onClick={handleStopSimulation}>Stop Simulation</button>
      {showGraph && (
        <div style={{ width: '800px', height: '250px' }}>
          <canvas id="vehicleChart" style={{ width: '100%', height: '100%' }}></canvas>
        </div>
      )}
    </div>
  );
};

export default Home;
