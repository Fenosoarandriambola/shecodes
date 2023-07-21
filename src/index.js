// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20
//   }
// };

let currenttime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[currenttime.getDay()];

let currenthours = currenttime.getHours();
if (currenthours < 10) {
  currenthours = `0${currenthours}`;
}

let currentminutes = currenttime.getMinutes();
if (currentminutes < 10) {
  currentminutes = `0${currentminutes}`;
}

let time = document.querySelector("#special-date");
console.log(time);

time.innerHTML = `${currentDay} ${currenthours} : ${currentminutes}`;

function showTemperature(response) {
  console.log(response.data.name);
  document.querySelector("#cityname").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(event) {
  event.preventDefault();
  let apiKey = "94cd4c88359bbfa73c8c4de8f49c0991";
  let city = document.querySelector("#searchtext").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#searchform");
form.addEventListener("submit", search);
