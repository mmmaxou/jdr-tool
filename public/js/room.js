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
  socket.on('mod', function (data) {
    console.log('data:', data);
    $('.card#'+data.id+ " .mod_" + data.selector).text(data.new)
  })
  socket.on('object', function (data) {
    console.log('data:', data);
    for (key in data.new) {
      if (data.new.hasOwnProperty(key)) {
          var elt = data.new[key]
          var s = '.card#'+data.id+ " ." + data.selector + "_" + key
          $(s).text(elt)
      }
    }
  })

})
