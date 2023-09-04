// we have a weather API thanks to Mike Zyma
const weatherElem = document.querySelector('.weather')

function updateWeather (data) {
  weatherElem.querySelector('.weather__city').textContent = data.name

  weatherElem.querySelector('.weather__desc').textContent = data.weather[0].description

  const tempCelsius = Math.round(data.main.temp - 273.15)
  weatherElem.querySelector('.weather__temp').textContent = tempCelsius + '°C'

  const iconUrl = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png'
  weatherElem.querySelector('.weather__icon img').src = iconUrl
}

function fetchWeather () {
  fetch('http://api.openweathermap.org/data/2.5/weather?id=6094817&lang=en&appid=ba21d4197cf3bb8014bd6808cae9d0ed')
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      updateWeather(data)
    })
    .catch(function (error) {
      console.error('Error fetching weather:', error)
    })
}

// updating weather every 10 min and on page load
fetchWeather()
setInterval(fetchWeather, 10 * 60 * 1000)

const currentDateElement = document.getElementById('current-date')

const currentDate = new Date()

const options = { weekday: 'short', month: 'short', day: 'numeric' }
const locale = 'en-US' 
const dateString = currentDate.toLocaleDateString(locale, options)

currentDateElement.innerText = dateString

// hovering logo effect - Tanya

function hover(img)
{ img.src = "images/logoInverse.gif"}
function hoverOut(img)
{ img.src = "images/logo small.gif"}