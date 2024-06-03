let amenities = {};

$(document).ready(function () {
  $('.amenities INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }

    let text = Object.values(amenities).join(', ');

    if (text.length > 25) {
      text = text.substring(0, 47) + '...';
    }

    $('.amenities h4').text(text);
  });
});

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

$(document).ready(function () {
  $('BUTTON').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify({
        amenities: Object.keys(amenities)
      }),
      success: (data) => {
        for (let place of data) {
          $('section.places').append(html(place));
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  });
});
