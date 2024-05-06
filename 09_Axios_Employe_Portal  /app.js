const serverURL = `http://127.0.0.1:3000/api`;

// content loaded (when the page is loaded completely)
window.addEventListener('DOMContentLoaded', () => {
    fetchEmployees();
});

let fetchEmployees = () => {
    let url = `${serverURL}/employees`;
    axios.get(url).then((response) => {
        let employees = response.data;
        let tableRows = '';
        for(let employee of employees){
            tableRows += `<tr">
                            <td>${employee.id}</td>
                            <td>${employee.first_name}</td>
                            <td>${employee.last_name}</td>
                            <td>${employee.email}</td>
                            <td>${employee.gender}</td>
                            <td>${employee.ip_address}</td>
                            <td>
                                <button class="btn btn-secondary mt-0 btn-sm update">Update</button>
                                <button class="btn btn-danger mt-0 btn-sm delete">Delete</button>
                            </td>
                          </tr>`
        }
        document.querySelector('#table-body').innerHTML = tableRows;
    }).catch((err) => {
        console.error(err);
    });
};

// add employee form
let addEmployeeForm = document.querySelector('#add-employee-form');
addEmployeeForm.addEventListener('submit', (e) => {
    e.preventDefault();   //to prevent auto form submission
    
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

    let employee = {
        first_name : document.querySelector('#add-first-name').value,
        last_name : document.querySelector('#add-last-name').value,
        email : document.querySelector('#add-email').value,
        gender : document.querySelector('#add-gender').value,
        ip_address : document.querySelector('#add-ip-address').value
    }
     // send this data to AJAX POST request to add/create new employee
    let url = `${serverURL}/employees`;
    axios.post(url, employee).then((response) => {
        console.log(response.data);
        fetchEmployees();
    }).catch((err) => {
        console.error(err);
    });
    clearFormFields();

});

//after submitting the form clear the form fields
let clearFormFields = () => {
    addEmployeeForm.reset();
};

// click table body
let tableBody = document.querySelector('#table-body');
tableBody.addEventListener('click', (e) => {
    let targetElement = e.target;

    // check if clicked class contains delete element
    if(targetElement.classList.contains('delete')){
        let selectedID = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
        console.log(selectedID);

        // now delete the record with this ID
        let url = `${serverURL}/employees/${selectedID}`;
        axios.delete(url).then((response) => {
            console.log(response.data);
            fetchEmployees();
        }).catch((err) => {
            console.error(err);
        });
    }

    // check if clicked class contains update element
    if(targetElement.classList.contains('update')){
        let selectedID = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
        let url = `${serverURL}/employees`;
        axios.get(url).then((response) => {
            let employees = response.data;
            let selectedEmployee = employees.find((employee) => {
                return employee.id === selectedID.trim();
            })
            populateUpdatedEmployeeModal(selectedEmployee);
        }).catch((err) => {
            console.error(err);
        });
    }
}) ;

let populateUpdatedEmployeeModal = (selectedEmployee) => {
    document.querySelector('#update-emp-id').value = selectedEmployee.id;
    document.querySelector('#update-first-name').value = selectedEmployee.first_name;
    document.querySelector('#update-last-name').value = selectedEmployee.last_name;
    document.querySelector('#update-email').value = selectedEmployee.email;
    document.querySelector('#update-gender').value = selectedEmployee.gender;
    document.querySelector('#update-ip-address').value = selectedEmployee.ip_address;

    // open the modal so that you can update/change it as you want
    let modalElement = document.querySelector('#update-employee-modal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    if(modalInstance){
        modalInstance.show();
    }else{
        // if no modal instance is found, create a new one and then hide it
        modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show()
    }
};

let updateEmployeeForm = document.querySelector('#update-employee-form');
updateEmployeeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let updatedEmployeeId = document.querySelector('#update-emp-id').value.trim();
    
    let url = `${serverURL}/employees/${updatedEmployeeId}`;

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

    // use PUT request to submit the form with the changes
    axios.put(url, employee).then((response) => {
        console.log(response.data);
        fetchEmployees();
    }).catch((err) => {
        console.error('Error during PUT request:', err);
    });

});