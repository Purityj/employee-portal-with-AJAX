// text button
let textButton = document.querySelector('#text-btn');
textButton.addEventListener('click', () => {
    fetchTextData();
});

let fetchTextData = () => {
    // use axios to get the data. Remember axios returns a Promise
    axios.get('./data/message.txt').then((response) => {
        if(response.status !== 200){
            console.log(`Something went wrong: ${response.status}`);
        }
        let fileContent = response.data;
        document.querySelector('#text-card').innerHTML =  `<h3>${fileContent}<h3>`;
        console.log(fileContent);
    }).catch((err) => {
        console.error(err)
    });
};

// JSON button
jsonButton = document.querySelector('#json-btn');
jsonButton.addEventListener('click', () => {
    fetchJSONdata();
});

let fetchJSONdata = () => {
    axios.get('./data/mobile.json').then((response) => {
        if(response.status !== 200){
            console.log(`Something went wrong ${responsestatus}`);
            return;
        }
        console.log(response.data);
        let mobile = response.data;
        htmlTemplate = '';
        htmlTemplate += `<ul class="list-group mt-1">
                            <li class="list-group-item">ID : ${mobile.id}</li>
                            <li class="list-group-item">Brand : ${mobile.brand}</li>
                            <li class="list-group-item">Color : ${mobile.color}</li>
                            <li class="list-group-item">Price : ${mobile.price}</li>
                        </ul>`;
        document.querySelector('#json-card').innerHTML = htmlTemplate;
    }).catch((err) => {
        console.error(err);
    });  
};

// API button
let apiButton = document.querySelector('#api-btn');
apiButton.addEventListener('click', () => {
    fetchAPIdata();
});

let fetchAPIdata = () => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        if(response.status !== 200){
            console.log(`Something went wrong: ${response.status}`);
            return;
        }
        let users = response.data;
        let htmlTemplate = '';
        for(let user of users){
            htmlTemplate += `<ul class="list-group mt-1">
                                <li class="list-group-item">ID : ${user.id}</li>
                                <li class="list-group-item">Name : ${user.name}</li>
                                <li class="list-group-item">Email : ${user.email}</li>
                                <li class="list-group-item">City : ${user.address.city}</li>
                             </ul>`
        }
        document.querySelector('#api-card').innerHTML = htmlTemplate;
    }).catch((err) => {
        console.error(err);
    });
};