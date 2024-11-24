const apikey = "13b2571fa2f390843987f147a1a3a8d9";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);

  if (response.ok) {
    var data = await response.json();
    console.log(data);

    if (data && data.main) {
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      if (data.weather && data.weather.length > 0) {
        const weatherCondition = data.weather[0].main;
        if (weatherCondition == "Clouds") {
          weatherIcon.src = "Images/cloud.png";
        } else if (weatherCondition == "Clear") {
          weatherIcon.src = "Images/clear.png";
        } else if (
          weatherCondition == "Rain" ||
          weatherCondition == "Thunderstorm"
        ) {
          weatherIcon.src = "Images/rain2.png";
        } else if (weatherCondition == "Mist") {
          weatherIcon.src = "Images/mist.png";
        } else if (weatherCondition == "Snow") {
          weatherIcon.src = "Images/snow.png";
        } else {
          weatherIcon.src = "Images/default.png";
        }
      }

      document.querySelector(".weather").style.display = "block";
    } else {
      alert("Invalid data structure.");
    }
  } else {
    alert("City not found. Please enter a valid city name.");
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
