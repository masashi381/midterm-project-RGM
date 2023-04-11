
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

