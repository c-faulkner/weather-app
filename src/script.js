// Current date and time

let now = new Date();
let currentTime = document.querySelector("#current-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
currentTime.innerHTML = `${day}, ${date} ${month}`;

// Display weather & forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col weather-forecast-day">
                <h3>${formatDay(forecastDay.dt)}</h3>
                <img src="src/img/${forecastDay.weather[0].icon}.svg"
                  alt=""      
                  class="weather-forecast-icon"
                  width="20"
                />
                <h3>
                  <strong>${Math.round(forecastDay.temp.day)}°C</strong>
                </h3>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `3a759a88e39e98e3809aa2fadfd9c6f9`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getWeather(response) {
  let weatherIcon = document.querySelector("#weather-icon");

  weatherIcon.setAttribute(
    "src",
    `src/img/${response.data.weather[0].icon}.svg`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  document.querySelector(`#city-name`).innerHTML = response.data.name;
  if (response.data.name.length > 7) {
    document.querySelector(`#city-name`).style.fontSize = "45px";
  }
  temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;
  document.querySelector(
    "#weather-description"
  ).innerHTML = `${response.data.weather[0].description}`;
  currentTempMin = Math.round(response.data.main.temp_min);
  currentTempMax = Math.round(response.data.main.temp_max);
  document.querySelector(
    "#temp-range"
  ).innerHTML = `${currentTempMin}° - ${currentTempMax}°`;
  document.querySelector(
    `#humidity`
  ).innerHTML = `${response.data.main.humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector(`#wind-speed`).innerHTML = `${wind}km/h`;
  getForecast(response.data.coord);
}

// Change temperature units

function displayFahrenheit(event) {
  event.preventDefault();
  let mainTemperatureElement = document.querySelector("#current-temp");
  mainTemperatureElement.innerHTML = Math.round(
    (`${temperature}` * 9) / 5 + 32
  );
  let tempRangeElement = document.querySelector("#temp-range");
  let tempMinElement = Math.round((`${currentTempMin}` * 9) / 5 + 32);
  let tempMaxElement = Math.round((`${currentTempMax}` * 9) / 5 + 32);
  tempRangeElement.innerHTML = `${tempMinElement}° - ${tempMaxElement}°`;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsius(event) {
  event.preventDefault();
  let mainTemperatureElement = document.querySelector("#current-temp");
  mainTemperatureElement.innerHTML = `${temperature}`;
  let tempRangeElement = (document.querySelector(
    "#temp-range"
  ).innerHTML = `${currentTempMin}° - ${currentTempMax}°`);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);
let temperature = null;
let currentTempMin = null;
let currentTempMax = null;

// Change city

function search(city) {
  let apiKey = "3a759a88e39e98e3809aa2fadfd9c6f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function changeCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

search("Lisbon");

let searchForm = document.querySelector("#city-input-form");
searchForm.addEventListener("submit", changeCity);
