$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/status/',
  method: 'GET',
  success: function () {
    $('DIV#api_status').addClass('available');
  },
  error: function () {
    $('DIV#api_status').removeClass('available');
  }
});
