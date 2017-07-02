$(document).ready(function () {

  socket = io.connect({
    'reconnection': true,
    'reconnectionDelay': 500,
    'reconnectionAttempts': 10
  })

  $(document).on('blur', '.field', function (e) {
    change(e)
  })

})


function change(e) {
  var $this = $(e.target)
  var t = $this.text() || $this.val()
  var id = $this.parents('.card').attr('id')
  var selector = $this.attr('class')
    .replace('field', '')
    .replace('materialize-textarea', "")
    .replace(/ /g, '')
  socket.emit('change', {
    id: id,
    new: t,
    selector: selector,
    roomId: getRoomID()
  })
}

function getRoomID() {
  return document.location.pathname.replace("/admin-room-", "")
}
