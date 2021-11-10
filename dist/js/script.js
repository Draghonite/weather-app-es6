import * as ELEMENTS from './elements.js';
import Http from './http.js';
import WeatherData, { WEATHER_PROXY_HANDLER} from './weather-data.js';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather() {
    const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
    if (CITY_NAME.length  === 0) {
        return alert("Please enter a city name");
    }
    const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    const API_KEY = params["weather_api"] || params["api"];
    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appid=${API_KEY}`;
    Http.fetchData(URL)
        .then(data => {
            const WEATHER_DATA = new WeatherData(CITY_NAME, data.weather[0].description.toUpperCase());
            const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
            WEATHER_PROXY.temperature = data.main.temp;
            // NOTE: just to show "Loading..." for a bit
            setTimeout(() => {
                updateWeather(WEATHER_DATA);
            }, 500);
        }).catch(error => alert(error));
};

function updateWeather(weatherData) {
    ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
    ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
    ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature;

    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
}