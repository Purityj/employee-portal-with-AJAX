const express = require('express');
const router = express.Router();

// Employee data
let employees = [
    {
        id : 'abc123',
        first_name : 'John',
        last_name : 'Wilson',
        email : 'john@gmail.com',
        gender : 'male',
        ip_address : '127.0.0.1'
    },
    {
        id : 'wxyz123',
        first_name : 'Laura',
        last_name : 'James',
        email : 'laura@gmail.com',
        gender : 'female',
        ip_address : '192.2.23.14'
    }
]

// create unique employee ID
let getID = () => {
    return   '_' + Math.random().toString(36).substr(2,9);
};

// GET request - Employees 
router.get('/employees', (request, response) => {
    console.log(`GET Request Received at server ... ${new Date().toLocaleTimeString()}`);
    response.json(employees);
});

// POST request 
router.post('/employees', (request, response) => {
    let employee = {
        id : getID(),
        first_name : request.body.first_name,    //this is how you get form data
        last_name : request.body.last_name,
        email : request.body.email,
        gender : request.body.gender,
        ip_address : request.body.ip_address
    }
    employees.push(employee);
    console.log(`POST Request Received at server ... ${new Date().toLocaleTimeString()}`);
    response.json({msg: 'POST Request is Success'});
});

// PUT request
router.put('/employees/:id', (request, response) => {
    // get id from url
    let empId = request.params.id;
    let updateEmployee = {
        id : empId,
        first_name : request.body.first_name,
        last_name : request.body.last_name,
        email : request.body.email,
        gender : request.body.gender,
        ip_address : request.body.ip_address
    };
    // find employee whose id matches with employee id you want to update
    let existingEmployee = employees.find((employee) => {
        return employee.id === empId;
    });
    // use splice to update/replace existing employee with the updateEmployee data
    employees.splice(employees.indexOf(existingEmployee), 1, updateEmployee);
    console.log(`PUT Request Received at server ... ${new Date().toLocaleTimeString()}`);
    response.json({msg: 'PUT Request is Success'});
});

// DELETE request
router.delete('/employees/:id', (request, response) => {
    let empId = request.params.id;
    employees = employees.filter((employee) => {
        return employee.id !== empId;        //this returns all employees except the one you want to delete
    });
    console.log(`DELETE Request Received at server ... ${new Date().toLocaleTimeString()}`);
    response.json({msg: 'DELETE Request is Success'});
});

// export the router module
module.exports = router;
