const api = {
    key: "d7aea8a0da43628f2931944ccb71ec0a",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if(evt.keyCode == 13) {
        getResults(searchbox.value);
        // console.log(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json(); // convert to json and pass to displayResults
    }).then(displayResults);
}

function displayResults (weather) {
    // console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date_el = document.querySelector('.location .date');
    let temp_el = document.querySelector('.temp');
    let weather_el = document.querySelector('.current .weather');
    let hilow_el = document.querySelector('.hi-low');

    date_el.innerText = dateBuilder(now);
    temp_el.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    weather_el.innerText = weather.weather[0].main;
    hilow_el.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}