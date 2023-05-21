// place your open weather api key here
const APIKEY = '';

// make post call to server /projectData to save
async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    });
    return await response.json();
}

// make get call to server /projectData to get data
const getData = async function (url) {
    let response = await fetch(url)
    try {
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

// fetch weather data from open weather api
const fetchWeather = async function (url) {
    let response = await fetch(url);
    try {
        return await response.json();
    } catch (err) {
        console.log(err)
    }
}

// Update EntryHolder element
const updateEntry = async function () {
    const dateElem = document.getElementById('date');
    const tempElem = document.getElementById('temp');
    const contentElem = document.getElementById('content');

    // make get call to server
    let newData = await getData("http://localhost:3000/projectData");

    // Updating the Entry
    dateElem.innerText = newData.date;
    tempElem.innerText = newData.temp + ' Fahrenheit';
    contentElem.innerText = newData.content;
}

// get entered form data and make post call api
const saveFormData = async function () {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${ zip }&APPID=${ APIKEY }`;

    if (zip.length === 0 || feelings.length === 0) {
        alert("Please enter zip code and feelings!");
        return
    }

    let weatherData = await fetchWeather(url);
    // get place temperature
    let temp = weatherData.main.temp;

    // Create a new date instance dynamically with JS
    let d = new Date();
    let date = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

    // prepare final save data object
    const data = {
        date: date, temp: temp, content: feelings,
    }

    //Post data to owr own server
    await postData("http://localhost:3000/projectData", data);

    //Update Entry
    updateEntry();
}


const generateBtn = document.querySelector('#generate');
generateBtn.addEventListener('click', saveFormData);
