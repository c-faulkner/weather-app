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

// Display city and weather

function getWeather(response) {
  document.querySelector(`#city-name`).innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;

  document.querySelector(
    "#weather-description"
  ).innerHTML = `${response.data.weather[0].main}`;

  let currentTempMin = Math.round(response.data.main.temp_min);
  let currentTempMax = Math.round(response.data.main.temp_max);
  document.querySelector(
    "#temp-range"
  ).innerHTML = `${currentTempMin}° - ${currentTempMax}°`;

  document.querySelector(
    `#humidity`
  ).innerHTML = `${response.data.main.humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  document.querySelector(`#wind-speed`).innerHTML = `${wind}km/h`;

  function displayFahrenheit(event) {
    event.preventDefault();
    let mainTemperatureElement = document.querySelector("#current-temp");
    mainTemperatureElement.innerHTML = Math.round(
      (`${temperature}` * 9) / 5 + 32
    );
  }

  function displayCelsius(event) {
    event.preventDefault();
    let mainTemperatureElement = document.querySelector("#current-temp");
    mainTemperatureElement.innerHTML = `${temperature}`;
  }

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheit);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsius);
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${cityInput.value}`;

  let apiKey = `3a759a88e39e98e3809aa2fadfd9c6f9`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeather);
}

let searchForm = document.querySelector("#city-input-form");
searchForm.addEventListener("submit", changeCity);
