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

function displayWeatherCondition (response) {
  
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);

document.querySelector("#description").innerHTML = response.data.weather[0].main;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#pressure").innerHTML = response.data.main.pressure;
document.querySelector("#wind").innerHTML = Math.round (response.data.wind.speed);
let iconElement = document.querySelector ("#icon");
let dateElement = document.querySelector ("#date");
celsiusTemperature = response.data.main.temp;
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute ("alt", response.data.weather[0].description);
dateElement.innerHTML = formatDate(response.data.dt * 1000);

temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement= document.querySelector ("#temperature");
   
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector ("#search-form");
form.addEventListener ("submit", handleSubmit); 

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click". displayCelsiusTemperature);

let currentLocationButton = document.querySelector ("#current-location-button");
currentLocationButton.addEventListener ("click", getCurrentLocation);

searchCity ("New York");

