const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const showMore = document.querySelector('.showMore-container button');
const showMoreDetailsContainer = document.querySelector('.showMore-container .showMore-weatherDetails');


search.addEventListener('click', function searchFunction() {
    const APIKey = '6ee27c8184bb80c0270db32179b59173';
    let city = document.querySelector('.search-box input').value;

    if (city === "") {
        console.log("empty");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            // Обробка отриманих даних та оновлення інтерфейсу
            console.log(JSON.stringify(json, null, 2));

            if (json.cod === '404') {
                container.style.height = '370px';
                error404.style.display = 'flex';
                error404.classList.add('fadeIn');
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                console.log("error404");
                showMore.style.display = 'none';
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const mainImage = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature .temp-degrees');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity p');
            const windSpeed = document.querySelector('.weather-details .wind-speed p');
            // SHOW-MORE 
            const feelsLikeTemp = document.querySelector('.weather-box .feelsLike-temp');
            const windDeg = document.querySelector('.showMore-container .showMore-weatherDetails .wind-deg p');
            const windGust = document.querySelector('.showMore-container .showMore-weatherDetails .wind-gust p');


            switch (json.weather[0].main) {
                case 'Clouds':
                    mainImage.src = './images/cloud.png';
                    console.log("clouds");
                    break;
                case 'Clear':
                    mainImage.src = './images/clear.png';
                    console.log("clear");

                    break;
                case 'Rain':
                    mainImage.src = './images/rain.png';
                    console.log("rain");

                    break;
                case 'Snow':
                    mainImage.src = './images/snow.png';
                    console.log("snow");

                    break;
                case 'Haze':
                    mainImage.src = './images/mist.png';
                    console.log("haze");
                    break;
                
                default:
                    mainImage.src = '';
            }
            temperature.innerHTML = `${parseInt(json.main.temp)}`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            windSpeed.innerHTML = `${json.wind.speed}m/s`;
            feelsLikeTemp.innerHTML = `Feels like ${parseInt(json.main.feels_like)}°C`;
            windDeg.innerHTML = `${json.wind.deg}°`;
            windGust.innerHTML = `${json.wind.gust}m/s`;
            
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '585px';

            showMore.addEventListener('click', () => {
                if (showMoreDetailsContainer.classList.contains('hide')) {
                    showMoreDetailsContainer.classList.remove('hide');
                    showMoreDetailsContainer.style.display = 'flex';
                    showMore.style.padding = '7px 0 0 0';
                    showMore.innerHTML = 'show less';
                    container.style.height = '650px';
                    feelsLikeTemp.style.display = 'block';
                } else {
                    showMoreDetailsContainer.classList.add('hide');
                    showMore.style.padding = '0px';
                    showMoreDetailsContainer.style.display = 'none';
                    showMore.innerHTML = 'show more';
                    container.style.height = '585px';
                    feelsLikeTemp.style.display = 'none'
                }
            });
        });
});


