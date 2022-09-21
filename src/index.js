function setDate(date) {
    let day = date.getDay();
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let currentDay = days[day];
    return `<strong> ${currentDay}  ${hour}:${minutes} </strong>`;
}
let now = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = setDate(now);

function displayWeatherCondition(response) {
    document.querySelector(
        "#city"
    ).innerHTML = `<strong>${response.data.name}</strong>`;
    document.querySelector("#temp").innerHTML = Math.round(
        response.data.main.temp
    );
    document.querySelector("#humidity").innerHTML = Math.round(
        response.data.main.humidity
    );
    document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
        response.data.weather[0].main;
}
function searchCity(city) {
    let apiKey = "aa7ae926ed329fc283c1be93b3d778e2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}
let searchElement = document.querySelector("#search");
searchElement.addEventListener("click", handleSubmit);

function searchLocation(position) {
    let apiKey = "079f7d455b93d429c5b8f891a9574c09";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={apiKey}&unit=metric`;

    axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Lagos");