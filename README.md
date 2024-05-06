# Employee Portal - AJAX Techniques Comparison
This repository demonstrates the implementation of an Employee Portal using different AJAX techniques: Vanilla JavaScript (using XMLHttpRequest), the Fetch API, and Axios. The purpose of this project is to explore and compare these techniques in terms of ease of use, functionality, and flexibility in handling asynchronous HTTP requests in a web application.

## Features

- List Employees: Display all employees fetched from a mock backend server.
- Add Employee: Allows the user to add a new employee to the database.
- Update Employee: Enables updating existing employee details.
- Delete Employee: Provides the option to remove an employee from the database.

## Technologies Used
- Express.js: Serves as the backend to manage employee data.
- Node.js: Runtime environment for the backend.
- Axios/Fetch API/XMLHttpRequest: Used for making HTTP requests in different implementations.
- Bootstrap: For styling and modal implementations.
- CORS: Enabled on the server to handle cross-origin requests.

## Setup and Installation
1. Clone the repository

        git clone https://github.com/Purityj/employee-portal-with-AJAX.git
        cd employee-portal

3. Install dependencies

        npm install
4. Run the server
   
        cd 00_Express_Server
        npm start

This will start the backend server on http://localhost:3000.
Open the web application index.html in the browser

## How to Use

Navigate through the application's UI in the browser to:

- View all employees in the system.
- Add new employees using the 'Add Employee' button which opens a modal for data entry.
- Update existing employees by clicking the 'Update' button alongside any employee's data.
- Delete employees by selecting the 'Delete' button.

## UI
![image](https://github.com/Purityj/employee-portal-with-AJAX/assets/74033379/6cb4288b-7a64-44a4-acf7-ec7f9c9fda9d)

