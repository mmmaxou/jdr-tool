$(document).ready(function () {

  socket = io.connect({
    'reconnection': true,
    'reconnectionDelay': 500,
    'reconnectionAttempts': 10
  })


  socket.on('change', function (data) {
    console.log('data:', data);
    $('.card#'+data.id+ " ." + data.selector).text(data.new)
  })

})
