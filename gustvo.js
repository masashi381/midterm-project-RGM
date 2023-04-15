const width = 15;
const height = 15;
const images = [];

for (let i = 1; i <= 360; i++) {
  const angle = (i - 90) * Math.PI / 180;

  const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <polyline points="${width / 2},${height / 2 - height * 0.4} ${width / 2 + width * 0.2},${height / 2} ${width / 2},${height / 2 + height * 0.4}" 
    transform="rotate(${i} ${width/2} ${height/2})" stroke="#000" stroke-width="2" fill="none" />
  </svg>`;

  const url = "data:image/svg+xml," + encodeURIComponent(svg);
  images[i] = url;
}



const lat = '49.246292'; 
const lon = '-123.116226';
const apiKey = '93538f0e30f3e0062ebbbfb9d367ab76';

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
        <div class="card" onclick="takeData('${dateText}')">
            <div style="margin:10px;">
                <h2 class="date">${dateText}</h2>
                <img class="svgTemp" src="images/temp.svg">
                <h3 class="temp">${temp}</h3>
                <div style="margin-top:5px;">
                    <div class="line">
                        <small>${minTF}</small>
                        <small style="margin-left:22px;">${maxTF}</small>
                    </div>
                </div>
                <img class="svgRain" src="images/rain.svg">
                <p style="margin-bottom:5px;margin-top:1px;">${rain} in</p>
                <p>Cloud: ${cloud}%</p>
                <p>Visibility: ${visibility/1000}Km</p>
                <p>Wind Speed: ${Math.round(windSpeed*1.60934)} Km/h</p>
                <p>Wind Direction: <img class="wSVG" src="${windSVG}"></p>
            </div>
        </div>
        `;
        forecastDiv.appendChild(forecastItem);
    });
})
.catch(error => console.error(error));

function takeData(date) {
    localStorage.setItem('clickedDate', date)
} // localStorage.getItem(clickedDate)