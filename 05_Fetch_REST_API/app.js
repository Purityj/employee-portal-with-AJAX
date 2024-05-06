import { brainHttp } from "./api/brainHttp.js";

let serverURL = `http://127.0.0.1:3000/api`

// get button
let getButton = document.querySelector('#get-btn');
getButton.addEventListener('click', () => {
    fetchEmployees();
    
});

// display employees
let fetchEmployees = () => {
    let url = `${serverURL}/employees`;
    brainHttp.get(url).then((data) => {
        let employees = data;
        let tableRows = '';
    for(let employee of employees){
        tableRows += `<tr>
                        <td>${employee.id}</td>
                        <td>${employee.first_name}</td>
                        <td>${employee.last_name}</td>
                        <td>${employee.email}</td>
                        <td>${employee.gender}</td>
                        <td>${employee.ip_address}</td>
                      </tr>`
    }
    document.querySelector('#table-body').innerHTML = tableRows       
    }).catch((err) => {
        console.error(err);
    });
}

// POST button
let postButton = document.querySelector('#post-btn');
postButton.addEventListener('click', () => {
    let newEmployee = {
        first_name : 'Lucas',
        last_name : 'Monk',
        email : 'monk@gmail.com',
        gender : 'male',
        ip_address : '192.29.18.125'
    };
    let url = `${serverURL}/employees`;
    brainHttp.post(url, newEmployee).then((data) => {
        console.log(data);
        fetchEmployees();
    }).catch((err) => {
        console.error(err);
    });
});

// PUT button
let putButton = document.querySelector('#put-btn');
putButton.addEventListener('click', () => {
    let empID = 'abc123';
    let url = `${serverURL}/employees/${empID}`
    let updatedEmployee = {
        id : empID,
        first_name : 'John',
        last_name : 'Grant',
        email : 'grant@gmail.com',
        gender : 'Male',
        ip_address : '255.255.255.0'
    }
    brainHttp.put(url, updatedEmployee).then((data) => {
        console.log(data);
        fetchEmployees();
    }).catch((err) => {
        console.error(err);
    });
});

// DELETE button
let deleteButton = document.querySelector('#delete-btn');
deleteButton.addEventListener('click', () => {
    let empID = 'wxyz123';
    let url = `${serverURL}/employees/${empID}`

    brainHttp.delete(url).then((data) => {
        console.log(data);
        fetchEmployees();
    }).catch((err) => {
        console.error(err);
    });
});