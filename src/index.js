

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

function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days =  [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
return days[day];

}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function(forecastDay,index){
    if (index < 6){ 
    forecastHTML = forecastHTML + `<div class = "col-2">
                                    <div class="forecast-date">
                                    ${formatDay(forecastDay.dt)}
                                    </div>
                                    
                                   
                                    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"/>
                                    <div class = "forecast-temperature">
                                    <span class="forecast-temperature-max">
                                     ${Math.round(forecastDay.temp.max)}°
                                    </span>
                                    <span class="forecast-temperature-min">
                                     ${Math.round(forecastDay.temp.min)}°
                                    </span>

                                    </span>
                                        
                                    </div>
              
                                  </div> `;}


  });
 

 forecastHTML = forecastHTML + `</div>`;
 forecastElement.innerHTML = forecastHTML;
}                                 




function getforecast(coordinates){
console.log(coordinates);
let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
 let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then (displayForecast);
}


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
  iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  iconElement.setAttribute("alt",response.data.weather[0].description);

getforecast(response.data.coord);
}


function search(city) {
  
  let apiKey = "94cd4c88359bbfa73c8c4de8f49c0991";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event){
  event.preventDefault();
let cityInputElement = document.querySelector("#searchtext");
 search(cityInputElement.value);
}
 



let form = document.querySelector("#searchform");
form.addEventListener("submit", handleSubmit);

let iconElement = document.querySelector("#icon");




search("New York");

