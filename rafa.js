const latitude = "49.246292";
const longitude = "-123.116226";
const APIKey = "ff3523e635ffd098e66980c521a7d050";
const units = "metric";
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=${units}`;
fetch (url)
    .then (response => response.json())
    .then (data => {
        const hourlyData = data.list.filter(item => {
            const date = new Date(item.dt * 1000);
            const now = date.getDate();
            // const hoursDiff = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
            // return hoursDiff >= 0 && hoursDiff <= 24; 
            return now >= 0 && now <= 24;                   
    });
    hourlyData.forEach((item, index) => {
        const temp = item.main.temp;
        const description = item.weather[0].description;
        const element = document.querySelector(`#weather-${index} .weather-data`);
        element.textContent = `Temp: ${temp}°C, ${description}`;
    });
})
// .catch(error => {
//     console.error(error);
// });