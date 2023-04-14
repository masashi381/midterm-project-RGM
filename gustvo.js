// Define the size of the SVG images
const width = 15;
const height = 15;

// Create an array to hold the SVG image URLs
const images = [];

// Loop through the numbers from 1 to 360
for (let i = 1; i <= 360; i++) {
  // Calculate the angle in radians
  const angle = (i - 90) * Math.PI / 180;

  // Create a new SVG element with a polyline pointing in the direction of the angle
  const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <polyline points="${width / 2},${height / 2 - height * 0.4} ${width / 2 + width * 0.2},${height / 2} ${width / 2},${height / 2 + height * 0.4}" 
    transform="rotate(${i} ${width/2} ${height/2})" stroke="#000" stroke-width="2" fill="none" />
  </svg>`;

  // Encode the SVG element as a data URL and add it to the array
  const url = "data:image/svg+xml," + encodeURIComponent(svg);
  images[i] = url;
}



const lat = 49.246292; // Replace with your latitude
const lon = -123.116226; // Replace with your longitude
const apiKey = '93538f0e30f3e0062ebbbfb9d367ab76'; // Replace with your OpenWeatherMap API key

const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
    const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    const forecastDiv = document.getElementById('forecast');

    forecast.forEach(item => {
        const date = new Date(item.dt * 1000);
        const minTF = Math.round(item.main.temp_min-273.15);
        const maxTF = Math.round(item.main.temp_max-273.15);
        const rain = item.rain ? item.rain['3h'] : "0.00";
        const cloud = item.clouds.all;
        const visibility = item.visibility;
        const windSpeed = item.wind.speed;
        const windDirection = item.wind.deg;
        const temp = Math.round(item.main.temp-273.15);

        const windSVG = images[Math.round((windDirection + 360) % 360)];

        const dateText = date.toLocaleDateString();
        const forecastItem = document.createElement('div');
        forecastItem.innerHTML = `
        <h2 class="date">${dateText}</h2>
        <img class="svg" src="temp.svg">
        <div class="line">
        <p>${minTF}</p>
        
        <p class="line">${maxTF}</p>
        </div>
        <div class="line">
        <p>Min</p>
        <p>Max</p>
        </div>
        <img class="svg" src="rain.svg">
        <p style="margin-left:25px;margin-bottom:10px;">${rain} in</p>
        <p>Cloud: ${cloud}%</p>
        <p>Visibility: ${visibility/1000}Km</p>
        <p>Wind Speed: ${Math.round(windSpeed*1.60934)} Km/h</p>
        <p>Wind Direction: <img class="wSVG" src="${windSVG}"></p>
        `;
        forecastDiv.appendChild(forecastItem);
    });
})
.catch(error => console.error(error));


// Math.round(curr.main.temp_min - 273.15));