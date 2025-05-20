// APIkey
const apiKey = "0083e5ebc0030487210d418fdfd6f165";

//  card the container for all data
const cardElement = document.getElementById("card");

// city Input
const cityInput = document.getElementById("cityInput");

// weatherForm
const weatherForm = document.getElementById("weatherForm");
weatherForm.addEventListener("submit", async event => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError("Not found or invalid city name");
    }
  } else {
    displayError("Please Enter a City")
  }
})

// function to get weather data it take the city
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new ErrorEvent("Could not  fetch weather data")
  }
  return await response.json();
}

// function to display weathe information it takes data and displays it
function displayWeatherInfo(data) {
  const {name:city,
          main:{temp, humidity},
          weather: [{description, id}]} = data;

  cardElement.textContent = "";
  cardElement.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay")
  tempDisplay.classList.add("tempDisplay")
  humidityDisplay.classList.add("humidityDisplay") 
  descDisplay.classList.add("descDisplay")   
  weatherEmoji.classList.add("emojiDisplay");
  

  cardElement.appendChild(cityDisplay);
  cardElement.appendChild(tempDisplay);
  cardElement.appendChild(humidityDisplay);
  cardElement.appendChild(descDisplay);
  cardElement.appendChild(weatherEmoji);
}

// function to get weather emoji based on what te weather is
function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️"; // Thunderstorm
    case weatherId >= 300 && weatherId < 400:
      return "🌧️"; // Drizzle
    case weatherId >= 500 && weatherId < 600:
      return "🌧️"; // Rain
    case weatherId >= 600 && weatherId < 700:
      return "❄️"; // Snow
    case weatherId >= 700 && weatherId < 800:
      return "🌫️"; // Mist
    case weatherId === 800:
      return "☀️"; // Clear
    case weatherId > 800:
      return "☁️"; // Clouds
    default:
      return ""; // Unknown
  }
}

// function to display error
function displayError(message) {
  const errorElement = document.createElement("p");
  errorElement.textContent = message;
  errorElement.classList.add("errorDisplay")
  cardElement.textContent = "";
  cardElement.style.display = "flex"
  cardElement.appendChild(errorElement);
}


