
let autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
  document.getElementById('autocomplete'),
  {
    types: ["(cities)"],
    fields: ['place_id', 'geometry', 'name']
  });
  // console.log("initAutocomplete" + autocomplete)
  autocomplete.addListener('place_changed', onPlaceChanged);
}
// const takeCityName = document.getElementById('autocomplete');
// console.log("test");
// takeCityName.addEventListener('change', onPlaceChanged);
function onPlaceChanged() {
  // console.log("test2");
  if(autocomplete != undefined){
    let place = autocomplete.getPlace();
    if(!place.geometry) {
      // User did not select a prediction: reset the input field
      document.getElementById('autocomplete').Placeholder = 'Enter a place';
    } else {
      // Display details about the valid place
      document.getElementById('cityName').innerText = place.name;
    }
  }
}

const clicked = document.getElementById('star');
clicked.addEventListener('click', () => {
  const select = document.getElementById('favoriteCity');
  const addOption = document.createElement('option');
  addOption.textContent = document.getElementById('cityName').innerText;
  select.append(addOption);
  //local storage
  const key = 'city';
  let favoriteArr = [];
  for(let i = 1; i < select.children.length; i++){
    favoriteArr.push(select.children[i].textContent);
  }
    const getJson = localStorage.getItem(key);
    const parsedCity = JSON.parse(getJson);
    if(parsedCity == null){
      addCity = new Array(favoriteArr);
      const json = JSON.stringify(favoriteArr);
      localStorage.setItem(key, json);
    } else{
      if(parsedCity.indexOf(favoriteArr) == -1){
        parsedCity.push(favoriteArr);
        const json = JSON.stringify(favoriteArr);
        localStorage.setItem(key, json);
      }
    }
  // const select = document.getElementById('favoriteCity');
  // const addOption = document.createElement('option');
  // for(let i = 0; i < select.children.length; i++){
  //   if(select.children[i] == null){
  //     addOption.textContent = document.getElementById('cityName').innerText;
  //     select.append(addOption);
  //   }
  // }
});