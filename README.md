  **Scenario and Vehicle Simulation Application**
This project is a web-based application built with React.js and Node.js for creating, displaying, updating, and deleting scenarios and vehicles. The application allows users to simulate the movement of vehicles within a scenario based on specified parameters.

#Features
•	Scenario Management: Users can create, view, update, and delete scenarios, each with a unique identifier, name, and duration.
•	Vehicle Management: Users can add, view, update, and delete vehicles within each scenario. Vehicles are defined by their identifier, name, initial position (X and Y coordinates), speed, and direction of movement.
•	Simulation: Users can start a simulation for a selected scenario, causing vehicles to move within the scenario based on their speed and direction. If a vehicle moves outside the designated area, it is hidden from view.
•	Validation: Proper validation is implemented to ensure that users cannot add vehicles with positions greater than the size of the graph container.

#Backend Implementation
The backend of the application is built using Node.js and Express.js. It handles API requests for CRUD operations on scenarios and vehicles, and stores data in a JSON file on the server.

#Frontend Implementation
The frontend of the application is built with React.js. It communicates with the backend via HTTP requests to perform CRUD operations and initiate simulations.

#Deployment
Deploy the application to a hosting platform like Vercel, Netlify, or Heroku. Make sure to configure Node.js server to run on the hosting platform as well.

Getting Started
To run the application locally, follow these steps:
1.	Clone this repository to your local machine.
2.	Navigate to the project directory.
3.	Install dependencies by running npm install in both the frontend and backend directories.
4.	Start the backend server by running npm start in the backend directory.
5.	Start the frontend development server by running npm start in the frontend directory.
6.	Open your web browser and navigate to http://localhost:3000 to view the application.


**AllScenarios Component Documentation**
The AllScenarios component displays a table of all scenarios with options to edit, delete, or add new scenarios. It also provides functionality to add vehicles to existing scenarios.

@Dependencies
•	React: for building the UI and managing state.
•	react-icons/fa: for rendering icons such as edit, delete, save, etc.
•	allscenarios.css: for styling the component.
•	ScenarioContext: for accessing and updating scenarios data across components.
•	AddVehicleTab: component for adding vehicles to scenarios.

$Functionality
State Management
•	useState hooks manage various state variables such as editableIndex, editedScenario, and showAddVehicle.
•	useContext hook accesses scenarios data and update functions from the ScenarioContext.
Event Handlers
•	handleEdit: Enables editing of a scenario by setting the editableIndex and editedScenario state.
•	handleAddScenario: Adds a new scenario with default values to the scenarios list.
•	handleAddVehicleClick: Sets showAddVehicle state to true to display the Add Vehicle tab.
•	handleSave: Saves the edited scenario by updating it in the scenarios list and session storage.
•	handleCancel: Cancels the edit mode by resetting the editableIndex state.
•	handleChange: Handles changes in scenario fields during edit mode.
•	handleDelete: Deletes a scenario from the scenarios list and session storage.
•	handleDeleteAll: Deletes all scenarios from session storage and resets the scenarios list.
Effects
•	useEffect hook logs scenarios to the console for debugging purposes.


**Usage
1.	Viewing Scenarios:
•	Displays a table of all scenarios with their names, times, and number of vehicles.
2.	Editing Scenarios:
•	Click the edit icon to enter edit mode for a scenario. Editable fields include scenario name and time.
•	Click the save icon to save changes, or the cancel icon to discard changes.
3.	Adding Scenarios:
•	Click the "New Scenario" button to add a new scenario with default values.
4.	Deleting Scenarios:
•	Click the delete icon to delete a scenario. This action cannot be undone.
5.	Adding Vehicles:
•	Click the "Add Vehicle" button to add vehicles to existing scenarios.

_Styling_
The component utilizes styles defined in the allscenarios.css file for consistent appearance and layout.

**AddScenario Component Documentation**
The AddScenario component provides a user interface to add new scenarios with a name and time. It uses React's state and context to manage the form data and update the scenarios stored in the session storage. The component also handles form validation and user feedback.
@Dependencies
•	React for building the UI and managing state.
•	ScenarioContext for sharing state between components.
•	addvehicles.css for styling the component.

$Functionality
State Management
•	scenarioName and scenarioTime: These state variables hold the values of the form inputs.
•	setScenarios: This function, provided by the ScenarioContext, updates the scenarios context.
Handlers
•	handleAddClick: This function validates the form, adds the new scenario to session storage, updates the context, and resets the form.

**Usage
1.	Adding a Scenario:
•	Fill in the "Scenario Name" and "Scenario Time" fields.
•	Click the "Add" button. If the "Scenario Time" is empty, an alert will be shown and a red border will appear around the input field.
•	If both fields are filled, the scenario is added to session storage and the context, and a success alert is shown.
2.	Resetting the Form:
•	Click the "Reset" button to clear both input fields.
3.	Going Back:
•	Click the "Go Back" button to navigate to the previous page.

_Styling_
The component uses classes defined in the addvehicles.css file for styling:
•	.scenario-add-heading
•	.scenario-form
•	.form-group
•	.input-row
•	.label-container
•	.white-label
•	.input-container
•	.add-button
•	.reset-button
•	.go-back-button
•	.error-border (for input validation)

**AddVehicles Component Documentation**
The AddVehicles component allows users to add vehicles to selected scenarios. It provides a form for inputting vehicle details such as name, speed, position, and direction. The component dynamically populates the scenario dropdown with available scenarios fetched from session storage and context.

@Dependencies
•	React: for building the UI and managing state.
•	addvehicles.css: for styling the component.
•	ScenarioContext: for accessing and updating scenarios data across components.

$Functionality
State Management
•	useState hooks manage various form fields and validation states.
•	useContext hook accesses scenarios data and update functions from the ScenarioContext.

Effects
•	useEffect hook fetches scenarios from session storage and context, and updates the state accordingly.
Event Handlers
•	handleAddVehicle: Adds a new vehicle to the selected scenario. It performs validation and updates the session storage and context with the new scenario data.
•	handleReset: Resets all form fields to their initial state.
•	handleGoBack: Implements the functionality to navigate back to the previous page.

**Usage
1.	Select Scenario:
•	Choose a scenario from the dropdown list.
2.	Input Vehicle Details:
•	Enter the vehicle name, speed, position (X and Y), and direction.
3.	Adding a Vehicle:
•	Click the "Add Vehicle" button to add the vehicle to the selected scenario.
4.	Resetting the Form:
•	Click the "Reset" button to clear all form fields.
5.	Navigating Back:
•	Click the "Go Back" button to return to the previous page.

_Styling_
The component utilizes styles defined in the addvehicles.css file for consistent appearance and layout.

**Home Component Documentation**
$Functionality Overview:
1.	Scenario and Vehicle Selection:
•	Allows users to select a scenario from a dropdown list.
•	Displays a table of vehicles associated with the selected scenario.
2.	Editing Vehicles:
•	Enables users to edit vehicle details such as name, position, speed, and direction.
•	Provides options to save or cancel edits.
3.	Adding Simulation:
•	Initiates a simulation based on the selected scenario, displaying the movement of vehicles in a chart.
4.	Stopping Simulation:
•	Stops the ongoing simulation when clicked.
5.	Chart Visualization:
•	Renders a chart using Chart.js library to visualize vehicle positions during simulation.
Component Structure:
  State Variables:
•	selectedScenarioIndex: Index of the selected scenario.
•	editableVehicleIndex: Index of the vehicle currently being edited.
•	editedVehicle: State holding edited vehicle details.
•	vehicleIdCounter: Counter for generating unique vehicle IDs.
•	showGraph: Flag to control the visibility of the simulation graph.
   Hooks Usage:
•	useContext: Accesses scenarios data and update functions from the ScenarioContext.
•	useState: Manages component-level state variables.
•	useEffect: Handles side effects like initializing state or rendering the chart.
•	useRef: Manages references to the chart instance and animation frame.
   Event Handlers:
•	Functions to handle scenario changes, editing, saving, and deleting vehicles, as well as starting and stopping simulations.
   Rendering:
•	Dropdown for scenario selection.
•	Table displaying vehicle details with options for editing and deletion.
•	Buttons to start and stop simulations.
•	Chart canvas for visualizing vehicle positions during simulation.

@Dependencies:
•	React: Core library for building user interfaces.
•	react-icons/fa: Provides Font Awesome icons for UI elements.
•	ScenarioContext: Context for managing scenarios data across components.
•	Chart.js: Library for creating charts and graphs.

_Styling:_
•	Utilizes styles defined in the allscenarios.css file for consistent appearance.

**Usage:
•	Incorporate this component into the application's routing system to navigate to the home page.
•	Ensure the ScenarioContext is properly set up to provide scenarios data and update functions.

**ScenarioContext and ScenarioProvider Components**
The ScenarioContext and ScenarioProvider components are used to manage the state related to scenarios within the application. 

Here's a breakdown of their functionality:
ScenarioContext
•	Purpose: Provides a context for sharing scenarios data and update functions with child components.
•	Exports:
•	ScenarioContext: The context object created using createContext().
•	Usage:
•	Wrap components that need access to scenarios data and update functions with ScenarioProvider.

ScenarioProvider
•	Purpose: Manages the state related to scenarios and provides it to child components through the context.
•	Props:
•	children: The child components wrapped by the provider.
•	State:
•	scenarios: State variable to store the scenarios data.
•	Effects:
•	Loads scenarios data from session storage when the component mounts using useEffect.
•	Exports:
•	ScenarioProvider: The provider component responsible for managing scenarios state.
•	Context Value:
•	Provides the scenarios state variable and the setScenarios function as context value to its children.
•	Usage:
•	Wrap the root component of the application or a relevant parent component with ScenarioProvider.

**Script for running Node.js server**

It imports the required modules, including app (presumably your Express.js application), debug, and http.
It normalizes the port number specified in the environment variable PORT or defaults to port 3000.
It creates an HTTP server using the createServer method from the http module, passing your Express.js application (app) as a parameter.
It sets up event listeners for the server:
error: Handles errors that occur when attempting to start the server, such as port conflicts or permission issues.
listening: Logs a message when the server starts listening for incoming requests.
It listens on the specified port for incoming HTTP requests.

To use this script:

> Make sure you have an Express.js application (app) defined in a separate file (e.g., app.js).
> Replace ../app with the path to your Express.js application file.
> Save this script in a file (e.g., server.js).
> Run the script using Node.js (node server.js) to start your server.


