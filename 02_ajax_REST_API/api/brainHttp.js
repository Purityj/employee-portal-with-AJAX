export class brainHttp{
    // this creates a new xmlhttpRequest whenever we create an object of this class
    constructor(){
        this.http = new XMLHttpRequest();
    }

    // GET request
    get = (url, callback) => {
        this.http.open('GET', url, true);
        this.http.send()
        this.http.onload = () => {
            if(this.http.status === 200){
                let employees = JSON.parse(this.http.responseText);
                callback(null, employees);
            }
            else{
                callback(`Error: ${this.http.status}`);
            }
        };
    };

    // POST request
    post = (url, employee, callback) => {
        this.http.open('POST', url, true);
        this.http.setRequestHeader('Content-Type', 'application/json');
        this.http.send(JSON.stringify(employee));
        this.http.onload = () => {
            let employees = JSON.parse(this.http.responseText);
            callback(employees)
        };

    };

        // PUT request 
    put = (url, employee, callback) => {
        this.http.open('PUT', url, true);
        this.http.setRequestHeader('Content-Type', 'application/json');
        this.http.send(JSON.stringify(employee));
        this.http.onload = () => {
            let employees = JSON.parse(this.http.responseText);
            callback(employees)
        };
    };

    // DELETE request
    deleteRequest = (url, callback) => {
        this.http.open('DELETE', url, true);
        this.http.setRequestHeader('Content-Type', 'application/json');
        this.http.send();
        this.http.onload = () => {
            let employees = JSON.parse(this.http.responseText);
            callback(employees)
        };
    };
}