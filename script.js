const icon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature-value p');
const description = document.querySelector('.temperature-description p') ;  
const locationElement = document.querySelector('.location p');
const notification = document.querySelector('.notification');



const weather = {};

weather.temperature = {
    unit: 'celsius'
};

const kelvin = 273;

const api_key = '96f6ba150dbfde1782395bffef95d6a2'

if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notification.style.display = 'block';
    notification.innerHTML = `<p> Your browser does not support geolocalization`;

}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longtitude = position.coords.longitude;

    getWeather(latitude, longtitude);
}

function showError(error) {
    notification.style.display = 'block';
    notification.innerHTML = `<p>${error.message}`;
}

function getWeather(latitude, longtitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${api_key}`
    // console.log(api);

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - kelvin);
            weather.description = data.weather[0].description;
            weather.icon = data.weather[0].icon
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function() {
            displayWeather();
        });
}

function displayWeather() {
    icon.innerHTML = `<img src="icons/${weather.icon}.png"</img>`
    temperature.innerHTML = `${weather.temperature.value}°C`
    description.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}
