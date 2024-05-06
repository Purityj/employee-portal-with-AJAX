import { brainHttp } from "./api/brainHttp.js";
const serverURL = `http://127.0.0.1:3000/api`

// GET Button
let getButton = document.querySelector('#get-btn');
getButton.addEventListener('click', () => {
   fetchEmployees();
});

let fetchEmployees = () => {
    // AJAX calls
    let http = new brainHttp();
    let url = `${serverURL}/employees`
    http.get(url, (err, employees) => {
        if(err) throw err;
        console.log(employees)
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
    });
    
};

// POST button
let postButton = document.querySelector('#post-btn');
postButton.addEventListener('click', () => {
    let url =  `${serverURL}/employees`
    let employee = {
        first_name : 'Rajan',
        last_name : 'Jain',
        email : 'rajan@gmail.com',
        gender : 'male',
        ip_address : '127.0.0.9'
    }

    let http = new brainHttp(); 
    http.post(url, employee, (data) => {
        alert(JSON.stringify(data));
        fetchEmployees();
    });
})

// PUT button
let putButton = document.querySelector('#put-btn');
putButton.addEventListener('click', () => {
    let empID = 'abc123';
    let employee = {
        id : empID,
        first_name : 'Isaac',
        last_name : 'Grant',
        email : 'grant@gmail.com',
        gender : 'Male',
        ip_address : '255.255.255.0'
    }
    let url = `${serverURL}/employees/${empID}`;

    let http = new brainHttp(); 
    http.put(url, employee, (employees) => {
        alert(JSON.stringify(employees))
        fetchEmployees();
    });
});

// DELETE button
let deleteButton = document.querySelector('#delete-btn');
deleteButton.addEventListener('click', () => {
    let empID = 'wxyz123';
    let url = `${serverURL}/employees/${empID}`
    let http = new brainHttp();
    http.deleteRequest(url, (employees) => {
        alert(JSON.stringify(employees));
        fetchEmployees();
    });
})
