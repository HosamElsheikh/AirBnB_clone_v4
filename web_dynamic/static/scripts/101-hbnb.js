let amenities = {};
let states = {};
let cities = {};

function changeHandler(className, caseName) {
  if ($(this).is(':checked')) {
    switch (caseName) {
      case 'states':
        states[$(this).attr('data-id')] = $(this).attr('data-name');
        break;
      case 'cities':
        cities[$(this).attr('data-id')] = $(this).attr('data-name');
        break;
      case 'amenities':
        amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        break;
    }
  } else {
    delete amenities[$(this).attr('data-id')];
    delete states[$(this).attr('data-id')];
    delete cities[$(this).attr('data-id')];
  }

  let text = Object.values(amenities).join(', ');

  if (text.length > 25) {
    text = text.substring(0, 47) + '...';
  }

  $(`${className} h4`).text(text);
}

$(document).ready(function () {
  $('.amenities INPUT[type="checkbox"]').change(function () {
    changeHandler.call(this, 'amenities', 'amenities');
  });
  $('.locations h2 INPUT[type="checkbox"]').change(function () {
    changeHandler.call(this, 'locations', 'states');
  });
  $('.locations INPUT[class="cities"]').change(function () {
    changeHandler.call(this, 'locations', 'cities');
  });
});

const html = (place, len, review) => {
  return `
      <article>
          <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
              <div class="max_guest">
                  ${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''} 
              </div>
            <div class="number_rooms">
                ${place.number_rooms} Bedroom${
    place.number_rooms > 1 ? 's' : ''
  } 
            </div>
            <div class="number_bathrooms">
                ${place.number_bathrooms} Bathroom${
    place.number_bathrooms > 1 ? 's' : ''
  } 
          </div>
          </div>
          <div class="description">${place.description}</div>
          <div class="reviews none">
          <h2>${len} Reviews</h2>
          <ul>
          <li>
          <h3>From Bob Dylan the 27th January 2017</h3>
          <p>Runshi is an epic host. Nothing more I can say. 5 star!</p>
          </li>
          <li>
          <h3>From Connor the 4th January 2017</h3>
          <p>Highly recommended!</p>
          </li>
          </ul>
        </div>
      </article>`;
};

$(document).ready(function () {
  let reviews = [];
  $('BUTTON').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify({
        amenities: Object.keys(amenities),
        states: Object.keys(states),
        cities: Object.keys(cities)
      }),
      success: (data) => {
        for (let place of data) {
          $.ajax({
            url: `http://0.0.0.0:5001/api/v1/places/${place.id}/reviews`,
            contentType: 'application/json',
            method: 'GET',
            success: (data) => {
              reviews = data;
              console.log(reviews);
            }
          });
          for (let review of reviews) {
            $('section.places').append(html(place, reviews.length, review));
          }
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  });
  $('.show').click(function () {
    $(this).toggleClass('none');
  });
});
