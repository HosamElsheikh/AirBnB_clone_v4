$(document).ready(function () {
  let amenities = {};

  $('INPUT[type="checkbox"]').change(function () {
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
    console.log(amenities);
  });
});
