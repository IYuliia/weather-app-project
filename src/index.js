let now= new Date();
let date = document.querySelector ("#date");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days [now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}


date.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeatherCondition (response) {
  console.log (response.data);
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#description").innerHTML = response.data.weather[0].main;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#pressure").innerHTML = response.data.main.pressure;
document.querySelector("#wind").innerHTML = Math.round (response.data.wind.speed);
}

function searchCity(city) {
  let apiKey = "3c6fa7eb1509f433df6d22a9b1a8b999";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit (event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation (position) {
  let apiKey = "3c6fa7eb1509f433df6d22a9b1a8b999";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition (searchLocation);

}

let form = document.querySelector ("#search-form");
form.addEventListener ("submit", handleSubmit); 

let currentLocationButton = document.querySelector ("#current-location-button");
currentLocationButton.addEventListener ("click", getCurrentLocation);

searchCity ("New York");


/*function convertToFahrenheit (event) {
  event.preventDefault();
   
  let temperatureElement = document.querySelector ("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round ((temperature * 9) / 5 + 32);
}
 

let fahrenheitLink = document.querySelector ("#fahrenheit-link");
fahrenheitLink.addEventListener ("click", convertToFahrenheit);

function convertToCelsius (event) {
  event.preventDefault();
   
  let temperatureElement = document.querySelector ("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round (24);
}

let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener ("click", convertToCelsius);*/

