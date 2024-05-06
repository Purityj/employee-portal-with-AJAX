// text button
let textButton = document.querySelector('#text-btn');
textButton.addEventListener('click', () => {
    fetchTextData();
});

// the Fetch API for Text Button
let fetchTextData = () => {
    fetch('./data/message.txt').then((response) => {
        if(response.status !== 200){
            console.log(`Something went wrong: ${response.status}`);
            return;                 //to get out of this if statement
        }
        response.text().then((data) => {
            let htmlTemplate = `<h3>${data}</h3>`
            document.querySelector('#text-card').innerHTML = htmlTemplate;
        });
    });
};

// JSON button
let jsonButton = document.querySelector('#json-btn');
jsonButton.addEventListener('click', () => {
    fetchJSONdata();
});

let fetchJSONdata = () => {
    fetch('./data/mobile.json').then((response) => {
        if(response.status !== 200){
            console.log(`Something went wrong: ${response.status}`);
            return; 
        }
        response.json().then((data) => {
            console.log(typeof data);
            let mobile = data;
            let htmlTemplate = `<ul class="list-group mt-1">
                                    <li class="list-group-item">ID : ${mobile.id}</li>
                                    <li class="list-group-item">Brand : ${mobile.brand}</li>
                                    <li class="list-group-item">Color : ${mobile.color}</li>
                                    <li class="list-group-item">Price : ${mobile.price}</li>
                                </ul>`
            document.querySelector('#json-card').innerHTML = htmlTemplate;
        });
    })
};

// API Button
let apiButton = document.querySelector('#api-btn');
apiButton.addEventListener('click', () => {
    fetchAPIdata();
});

let fetchAPIdata = () => {
    fetch('https://jsonplaceholder.typicode.com/users').then((response) => {
        if(response.status !== 200){
            console.log(`Something went wrong: ${response.status}`);
            return;
        }
        response.json().then((data) => {
            let users = data;
            let userList = '';
            for(let user of users){
                userList += `<ul class="list-group mt-1">
                                <li class="list-group-item">ID : ${user.id}</li>
                                <li class="list-group-item">Name : ${user.name}</li>
                                <li class="list-group-item">Email : ${user.email}</li>
                                <li class="list-group-item">City : ${user.address.city}</li>
                             </ul>`
            }
            document.querySelector('#api-card').innerHTML = userList;
        });
    });
};