const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '6ee27c8184bb80c0270db32179b59173';
    let city = document.querySelector('.search-box input').value;

    if (city === "") {
        console.log("empty");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            console.log(JSON.stringify(json, null, 2));

            if (json.cod === '404') {
                container.style.height = '400px';
                error404.style.display = 'flex';
                error404.classList.add('fadeIn');
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                console.log("error404");
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const mainImage = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature .temp-degrees');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity p');
            const windSpeed = document.querySelector('.weather-details .wind-speed p');

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
            description.innerHTML = `${json.weather[0].main}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            windSpeed.innerHTML = `${json.wind.speed}m/s`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
});