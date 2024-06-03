const html = (place) => {
  return `<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">
            ${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''} 
          </div>
          <div class="number_rooms">
            ${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's' : ''} 
          </div>
          <div class="number_bathrooms">
            ${place.number_bathrooms} Bathroom${
    place.number_bathrooms > 1 ? 's' : ''
  } 
          </div>
        </div>
        <div class="description">${place.description}</div>
      </article>`;
};
$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  contentType: 'application/json',
  method: 'POST',
  success: function (data) {
    for (let place of data) {
      $('section.places').append(html(place));
    }
  },
  error: function (error) {
    console.log(error);
  },
  data: JSON.stringify({})
});
