let autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
  document.getElementById('autocomplete'),
  {
    types: ["establishment"],
    componentRestrictions: {'country' : ["CA"]},
    fields: ['place_id', 'geometry', 'name']
  });
}

function onPlaceChanged() {
  const place = autocomplete.getPlace();
  if(!place.geometry) {
    // User did not select a prediction: reset the input field
    document.getElementById('autocomplete').Placeholder = 'Enter a place';
  } else {
    // Display details about the valid place
    document.getElementById('details').interHTML = place.name;
  }
}

window.onload = function() {
  navigator.geolocation.getCurrentPosition(successCallback);
};

function successCallback(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let latLngInput = new google.maps.LatLng(latitude, longitude);
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode(
    {
      latLng: latLngInput
    },
    function(results, status) {
      let address = "";
      if(status == google.maps.GeocoderStatus.OK) {
        address = results[0].formatted_address;
      } else if(status == google.maps.GeocoderStatus.ZERO_RESULTS){
        alert("I couldn't find your address")
      }
      document.getElementById('cityName').innerText = address;
    }
  );
}