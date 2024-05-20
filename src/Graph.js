import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { ScenarioContext } from './ScenarioContext';

const Graph = () => {
  const { scenarios } = useContext(ScenarioContext);

  // Extract x and y coordinates from vehicles in the selected scenario
  const vehicleData = scenarios?.[0]?.vehicles.map(vehicle => ({
    x: parseFloat(vehicle.positionX),
    y: parseFloat(vehicle.positionY)
  })) || [];

  // Define chart data
  const data = {
    datasets: [
      {
        label: 'Vehicles',
        data: vehicleData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  // Define chart options
  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        type: 'linear',
        position: 'left',
      },
    },
  };

  return (
    <div>
      <h2>Graph</h2>
      <div style={{ width: '80%', margin: 'auto' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Graph;
