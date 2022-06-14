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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {

  forecastHTML = forecastHTML + `
 
        <div class="col-2">
          <div class="weather-forecast-date">${day}
          </div>
          <img src="http://openweathermap.org/img/wn/50d@2x.png"
               alt="" width="42"/>
               <div class="weather-forecast-temperatures">
                 <span class="weather-forecast-temperatures-max">
                   18˚ </span>
                   <span class="weather-forecast-temperatures-min">
                   12˚ </span>
               </div>
        </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;    
  forecastElement.innerHTML = forecastHTML;
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


let form = document.querySelector ("#search-form");
form.addEventListener ("submit", handleSubmit); 


let currentLocationButton = document.querySelector ("#current-location-button");
currentLocationButton.addEventListener ("click", getCurrentLocation);

displayForecast();
searchCity ("New York");

