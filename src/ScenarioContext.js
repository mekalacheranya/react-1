import React, { createContext, useState, useEffect } from 'react';

export const ScenarioContext = createContext();

export const ScenarioProvider = ({ children }) => {
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    const storedScenariosJSON = sessionStorage.getItem('scenarios');
    const storedScenarios = storedScenariosJSON ? JSON.parse(storedScenariosJSON) : [];
    setScenarios(storedScenarios);
  }, []);

  return (
    <ScenarioContext.Provider value={{ scenarios, setScenarios }}>
      {children}
    </ScenarioContext.Provider>
  );
};
