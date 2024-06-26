import { brainHttp } from "./api/brainHttp.js"

let serverURL = 'http://127.0.0.1:3000/api';

// DOM Content Loaded
window.addEventListener('DOMContentLoaded', () => {
    fetchAllEmployees();
});

let fetchAllEmployees = () => {
    let http = new brainHttp();
    let url = `${serverURL}/employees`
    http.get(url, (err, employees) => {
        if(err) throw err;
        let employeeRow = '';
        for(let employee of employees){
            employeeRow += `<tr>
                                <td>${employee.id}</td>
                                <td>${employee.first_name}</td>
                                <td>${employee.last_name}</td>
                                <td>${employee.email}</td>
                                <td>${employee.gender}</td>
                                <td>${employee.ip_address}</td>
                                <td>
                                    <button class="btn btn-secondary btn-sm mt-0 update">update</button>
                                    <button class="btn btn-danger btn-sm mt-0 delete">delete</button>
                                </td>
                            </tr>`
        }
        document.querySelector('#table-body').innerHTML = employeeRow
    });
};

// add employee form
let addEmployeeForm = document.querySelector('#add-employee-form');
addEmployeeForm.addEventListener('submit', (e) => {
    e.preventDefault();     //stop auto form submits

    // correctly reference the modal and directly hide it after form has been submitted
    let modalElement = document.querySelector('#add-employee-modal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    if(modalInstance){
        modalInstance.hide();
    }else{
        // if no modal instance is found, create a new one and then hide it
        modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.hide()
    }

    // fetch form data
    let employee = {
        first_name : document.querySelector('#add-first-name').value,
        last_name  : document.querySelector('#add-last-name').value,
        email : document.querySelector('#add-email').value,
        gender : document.querySelector('#add-gender').value,
        ip_address : document.querySelector('#add-ip-address').value,
    }

    // send this data to AJAX POST request to add/create new employee
    let url = `${serverURL}/employees`;
    let http = new brainHttp();
    http.post(url, employee, (employees) => {
        console.log(employees);
        fetchAllEmployees();
        clearFormFields();
    });
});

// clear all form fields after submitting the form
let clearFormFields = () => {
    addEmployeeForm.reset();
};

// click event on entire table body
let tableBody = document.querySelector('#table-body');
tableBody.addEventListener('click', (e) => {
    let targetElement = e.target;
    
    // check if target element has a class delete - this means delete button has been clicked
    // if it does, delete the entire row
    if(targetElement.classList.contains('delete')){
        let selectedId = targetElement.parentElement.parentElement.firstElementChild.innerHTML;

        // use AJAX DELETE request to delete the selected ID
        let url = `${serverURL}/employees/${selectedId}`;
        let http = new brainHttp();
        http.deleteRequest(url, (employees) => {
            console.log(employees);
            fetchAllEmployees();
        });
    }

    // check if target element has a class update - this means we clicked update button
    if(targetElement.classList.contains('update')){
        let selectedId = targetElement.parentElement.parentElement.firstElementChild.innerHTML;

        // fetch the object/employee with this ID - 
        // but first fetch all employees and filter out the employee you want
        let http = new brainHttp();
        let url = `${serverURL}/employees`
        http.get(url, (err, employees) => {
            if(err) throw err;
            let selectedEmployee = employees.find((employee) => {
                return employee.id === selectedId.trim();
            });
            populateUpdateModal(selectedEmployee);
        });

    }
});

let populateUpdateModal = (selectedEmployee) => {
    document.querySelector('#update-emp-id').value = selectedEmployee.id;
    document.querySelector('#update-first-name').value = selectedEmployee.first_name;
    document.querySelector('#update-last-name').value = selectedEmployee.last_name;
    document.querySelector('#update-email').value = selectedEmployee.email;
    document.querySelector('#update-gender').value = selectedEmployee.gender;
    document.querySelector('#update-ip-address').value = selectedEmployee.ip_address;

    // show the modal
    let modalElement = document.querySelector('#update-employee-modal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    if(modalInstance){
        modalInstance.show();
    }else{
        // if no madal instance is found, create a new one and then show it
        modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show()
    }
};

// use AJAX PUT request to update employee data of the given id
let updateEmployeeForm = document.querySelector('#update-employee-form');
updateEmployeeForm.addEventListener('submit', (e) => {
    let employeeId = document.querySelector('#update-emp-id').value.trim();
    e.preventDefault();
    // hide the modal
    let modalElement = document.querySelector('#update-employee-modal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    if(modalInstance){
        modalInstance.hide();
    }else{
        // if no madal instance is found, create a new one and then show it
        modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.hide()
    }
    let employee = {
        first_name : document.querySelector('#update-first-name').value,
        last_name : document.querySelector('#update-last-name').value,
        email : document.querySelector('#update-email').value,
        gender : document.querySelector('#update-gender').value,
        ip_address : document.querySelector('#update-ip-address').value
    };
    let url = `${serverURL}/employees/${employeeId}`;

    let http = new brainHttp();
    http.put(url, employee, (employees) => {
        console.log(employees)
        fetchAllEmployees();

    });
});
