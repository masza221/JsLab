let cityInput = document.querySelector("#city");
let cities = document.querySelector(".cities");
let controller;

class Weather {
  constructor(city) {
    this.city = city;
    this.latitude = 0;
    this.longitude = 0;
    this.temperature = 0;
    this.humidity = 0;
    this.weather = "";
    this.icon = "";
    this.wind = 0;
  }
  updateWeather(
    city,
    latitude,
    longitude,
    weather,
    temperature,
    humidity,
    icon,
    wind
  ) {
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
    this.weather = weather;
    this.temperature = temperature;
    this.humidity = humidity;
    this.icon = icon;
    this.wind = wind;
  }
  createWeatherDiv(id) {
    // Create a div element
    const div = `
          <div class="weather">
          <div onclick="deleteElement(${id})" class="hamburger"><div></div></div>
              <h1>${this.city}</h1>
                <h2>${this.weather}</h2>
                <img src="http://openweathermap.org/img/w/${this.icon}.png" alt="weather icon">
                <h2>${this.temperature}°C</h2>
                <h2>${this.humidity}%</h2>
                <h2>${this.wind}km/h</h2>
          </div>
      `;
    return div;
  }
}
//array of weather objects
let weatherArray = [];
const weatherContainer = document.querySelector(".weather-container");

//get weather data from api
async function getWeatherData(lat, long) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2d33ce6cc5f1521108a9a95cfeaaa92c`
  );
  const data = await response.json();
  return data;
}

async function getWeather(long, lat) {
  const data = await getWeatherData(long, lat);
  const weather = new Weather(city);
  weather.updateWeather(
    data.name,
    long,
    lat,
    data.weather[0].main,
    (data.main.temp - 273.15).toFixed(1),
    data.main.humidity,
    data.weather[0].icon,
    data.wind.speed
  );
  weatherArray.push(weather);
  const id = weatherArray.indexOf(weather);
  weatherContainer.innerHTML += weather.createWeatherDiv(id);
  addToLocalStorage();
}
function findCity() {
  getWeather(city);
}

async function getCites(city) {
  if (city.length < 4) return;

  if (controller) {
    controller.abort();
  }

  controller = new AbortController();

  try {
    cities.innerHTML = "<li>Loading...</li>";
    const response = await fetch(
      ` http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=${city}`,
      {
        signal: controller.signal,
      }
    );
    const data = await response.json();
    if(data.data.length === 0) {
      return 'no cities found'
    }
    return data;
  } catch (error) {
    console.log(error);
    return "error";
  }
}

async function showCities(city) {
  if (city.length < 4) return;
  try {
    const data = await getCites(city);
    if (data === "error") return;
    if(data === 'no cities found') {
      cities.innerHTML = '<li>No cities found</li>'
      return
    }
    cities.innerHTML = "";
    data.data.forEach((city) => {
 
      const cityElement = document.createElement("li");
      cityElement.innerHTML = city.name;
      cities.appendChild(cityElement);
      cityElement.addEventListener("click", () => {
        if (weatherArray.some((element) => element.city === city.name)) {
          alert("You already added this city");
          return;
        }
        if (weatherArray.length >= 10) {
          alert("You can only add 10 cities");
          return;
        }

        getWeather(city.latitude, city.longitude);
        cityInput.value = "";
        cities.innerHTML = "";
      });
    });
  } catch (error) {
    console.log(error);
  }
}

cityInput.addEventListener("input", (e) => {
  if (e.target.value.length < 4) return;
  const city = e.target.value;
  showCities(city);
});

//add to local storage and get from local storage
function addToLocalStorage() {
  localStorage.setItem("weatherArray", JSON.stringify(weatherArray));
}

function getFromLocalStorage() {
  const weatherArray = JSON.parse(localStorage.getItem("weatherArray"));
  if (weatherArray) {
    weatherArray.forEach((element) => {
      getWeather(element.latitude, element.longitude);
    });
  }
}

function deleteElement(id) {
  weatherArray.splice(id, 1);
  weatherContainer.innerHTML = "";
  weatherArray.forEach((element) => {
    const id = weatherArray.indexOf(element);
    weatherContainer.innerHTML += element.createWeatherDiv(id);
  });
  addToLocalStorage();
}

setInterval(() => {
  weatherContainer.innerHTML = "";
  const oldWeatherArray = weatherArray;
  weatherArray = [];
  oldWeatherArray.forEach((element) => {
    getWeather(element.latitude, element.longitude);
  }
  );
  console.log("updated");
}, 300000);




getFromLocalStorage();
