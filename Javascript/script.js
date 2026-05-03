const cityInput = document.getElementById("cityInput")
const searchBtn = document.getElementById("searchBtn")
const message = document.getElementById("message")
const weatherCard = document.getElementById("weatherCard")

searchBtn.addEventListener("click", getWeather)

cityInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather()
  }
})

async function getWeather() {
  const city = cityInput.value.trim()

  if (city === "") {
    message.textContent = "Enter city name"
    return
  }

  message.textContent = "Loading..."
  weatherCard.innerHTML = ""

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    )

    const geoData = await geoRes.json()

    if (!geoData.results) {
      message.textContent = "City not found"
      return
    }

    const lat = geoData.results[0].latitude
    const lon = geoData.results[0].longitude
    const cityName = geoData.results[0].name

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    )

    const weatherData = await weatherRes.json()

    const temp = weatherData.current_weather.temperature
    const wind = weatherData.current_weather.windspeed
    const code = weatherData.current_weather.weathercode

    const condition = getCondition(code)
    const icon = getIcon(code)

    weatherCard.innerHTML = `
      <h2>${cityName}</h2>
      <img src="${icon}">
      <p>Temperature: ${temp} °C</p>
      <p>Wind Speed: ${wind} km/h</p>
      <p>Condition: ${condition}</p>
    `

    message.textContent = ""

  } catch (error) {
    message.textContent = "Failed to fetch weather"
  }
}

function getCondition(code) {
  if (code === 0) return "Clear Sky"
  if (code <= 3) return "Cloudy"
  if (code <= 67) return "Rainy"
  if (code <= 77) return "Snow"
  return "Unknown"
}

function getIcon(code) {
  if (code === 0) return "https://cdn-icons-png.flaticon.com/512/869/869869.png"
  if (code <= 3) return "https://cdn-icons-png.flaticon.com/512/414/414825.png"
  if (code <= 67) return "https://cdn-icons-png.flaticon.com/512/3351/3351979.png"
  if (code <= 77) return "https://cdn-icons-png.flaticon.com/512/642/642102.png"
  return "https://cdn-icons-png.flaticon.com/512/869/869869.png"
}