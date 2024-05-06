// text file data
let textButton = document.querySelector('#text-btn');
textButton.addEventListener('click', function(){
    // create an AJAX request
    let xhr = new XMLHttpRequest();

    // prepare the request
    xhr.open('GET', './data/message.txt', true);

    // send the request
    xhr.send();

    // process the request. onload means once the server is ready with your response
    xhr.onload = () => {
        if(xhr.status === 200){
            let data = xhr.responseText;
            // console.log(data);
            displayTextData(data)
        }
    };

});

// display text data
let displayTextData = (data) => {
    let htmlTemplate = `<h3>${data}<h3/>`;
    document.querySelector('#text-card').innerHTML = htmlTemplate;
}

// JSON data
let jsonButton = document.querySelector('#json-btn');
jsonButton.addEventListener('click', function(){
    // create an AJAX request
    let xhr = new XMLHttpRequest();

    // prepare the request 
    xhr.open('GET', './data/mobile.json', true);

    // send the request
    xhr.send();

    // process the request 
    xhr.onload = () => {
        let data = xhr.responseText;
        let mobile = JSON.parse(data);
        // console.log( mobile)
        displayJsonData(mobile)
    };
});

// display json data
displayJsonData = (mobile) => {
    let htmlTemplate = '';
    htmlTemplate = `<ul class=list-group mt-1>
                        <li class=list-group-item>ID : ${mobile.id}</li>
                        <li class=list-group-item>Brand : ${mobile.brand}</li>
                        <li class=list-group-item>Color : ${mobile.color}</li>
                        <li class=list-group-item>Price : ${mobile.price}</li>
                    </ul>`;
    document.querySelector('#json-card').innerHTML = htmlTemplate;
};

// API data
let apiData = document.querySelector('#api-btn');
apiData.addEventListener('click', function(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
    xhr.send();
    xhr.onload = () => {
        if(xhr.status === 200){
            let data = xhr.responseText;
            let users = JSON.parse(data);
            // console.log(users)
            displayApiData(users)
        }
    };
});

// display API data
displayApiData = (users) => {
    let htmlTemplate = '';
    for(let user of users){
        htmlTemplate += `<ul class=list-group mt-1>
                        <li class=list-group-item>ID : ${user.id}</li>
                        <li class=list-group-item>Name : ${user.name}</li>
                        <li class=list-group-item>Username : ${user.username}</li>
                        <li class=list-group-item>Email : ${user.email}</li>
                        <li class=list-group-item>Stret : ${user.address.street}</li>
                        <li class=list-group-item>City : ${user.address.city}</li>
                    </ul>`;
    }
        
    document.querySelector('#api-card').innerHTML = htmlTemplate;
};