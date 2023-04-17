
let autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
  document.getElementById("autocomplete"),
  {
    types: ["(cities)"],
    fields: ["place_id", "geometry", "name"]
  });
  autocomplete.addListener("place_changed", onPlaceChanged);
}
function onPlaceChanged() {
  if(autocomplete != undefined){
    let place = autocomplete.getPlace();
    if(!place.geometry) {
      // User did not select a prediction: reset the input field
      document.getElementById("autocomplete").Placeholder = "Enter a place";
    } else {
      // Display details about the valid place
      document.getElementById("cityName").innerText = place.name;
      query_params.q = place.name;
      console.log(query_params)
    }
  }
}

const clicked = document.getElementById("star");
clicked.addEventListener("click", () => {
  const select = document.getElementById("favoriteCity");
  const addOption = document.createElement("option");
  let addSelect = [];
  for(let i = 1; i < select.children.length; i++){ 
    addSelect.push(select.children[i].textContent);
  }
  addOption.textContent = document.getElementById("cityName").innerText;
  if(addSelect.indexOf(addOption.textContent) == -1){   
    select.append(addOption);
    const key = 'city';
    addSelect.push(addOption.textContent);
    const json = JSON.stringify(addSelect);
    localStorage.setItem(key, json);
  }
  clicked.classList.add("color");
});
clicked.removeEventListener("click", () =>{
  clicked.classList.remove("color");
});

const geograph = new URLSearchParams({
  appid:"6189e8e30fbb318244f5ca5b9d7a449f",
  q: "vancouver",
}); 

fetch("http://api.openweathermap.org/geo/1.0/direct?" + geograph)
.then(response => {
  return response.json();
})
.then(data => {
  const location = data[0].name;
  const place = document.getElementById("cityName");
  place.innerText = location;
})


//parammeter of API request 
const query_params = new URLSearchParams({ 
  appid: "6189e8e30fbb318244f5ca5b9d7a449f", 
  q: "vancouver",
  lang:"en", 
  exclude: "current",
  units: "metric",
});

//APIrequest
fetch("https://api.openweathermap.org/data/2.5/weather?" + query_params)
.then(response => {
  return response.json();
})
.then(data => {
  const weather = data.weather[0].main;
  const description = data.weather[0].description;
  const temperature = data.main.temp; 
  const currentWeather_temp = document.getElementById("currentWeather-temp");
  currentWeather_temp.innerText = temperature;
  const weather_info = document.getElementById("weatherinfo")
  const addInfo = document.createElement("h2");
  addInfo.classList.add("weatherType");
  addInfo.innerText = weather;
  weather_info.append(addInfo);
  const addDescription = document.createElement("P");
  addDescription.classList.add("weatherDetail");
  addDescription.innerText = description;
  weather_info.append(addDescription);
})
