$(document).ready(function () {

  socket = io.connect({
    'reconnection': true,
    'reconnectionDelay': 500,
    'reconnectionAttempts': 10
  })

  $(document).on('blur', '.field', function (e) {
    change(e)
  })
  $(document).on('blur', '.force, .dext, .con, .int, .sag, .char', function (e) {
    mod(e)
  })
  $(document).on('blur', '.level', function (e) {
    bonus(e)
  })
  $(document).on('blur change', 'select.armorClass, .armor', function (e) {
    select(e)
  })

})


function change(e) {
  var $this = $(e.target)
  var t = $this.val() || $this.text()
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

function mod(e) {
  var $this = $(e.target)
  var t = $this.val() || $this.text()
  var id = $this.parents('.card').attr('id')
  var selector = $this.attr('class')
    .replace('field', '')
    .replace('materialize-textarea', "")
    .replace(/ /g, '')
  var mod = getModValue(t)
  socket.emit('mod', {
    id: id,
    new: mod,
    selector: selector,
    roomId: getRoomID()
  })
}

function bonus(e) {

  var $this = $(e.target)
  var t = $this.val() || $this.text()
  var id = $this.parents('.card').attr('id')
  var selector = $this.attr('class')
    .replace('field', '')
    .replace('materialize-textarea', "")
    .replace(/ /g, '')
  var mod = getBonusValue(t)
  socket.emit('mod', {
    id: id,
    new: mod,
    selector: selector,
    roomId: getRoomID()
  })
}

function select(e) {
  // Current object
  var $this = $(e.target)
  var id = $this.parents('.card').attr('id')

  // Select
  var select = $('#' + id + " select.armorClass")
  var t = select.val()
  var mod = getMod(id, "dext")
  if (t) {
    var CA = selectMap[t](mod)
  } else {
    var CA = 0
  }

  // Armor value
  var armorValue = Number($('#' + id + " .armor").val())
  var armor = {
    light: false,
    medium: false,
    heavy: false,
    value: armorValue,
    CA: CA,
    total: CA + armorValue,
  }
  armor[t] = true
  console.log('armor:', armor);
  socket.emit('object', {
    id: id,
    selector: "armor",
    new: armor,
    roomId: getRoomID()
  })

}
var selectMap = {
  light: function (n) {
    return Number(n)
  },
  medium: function (n) {
    return n > 2 ? 2 : Number(n)
  },
  heavy: function (n) {
    return 0
  },
  fixe: function (n) {
    return 0
  }
}

function getRoomID() {
  return document.location.pathname.replace("/admin-room-", "")
}

function getMod(id, carac) {
  var $this = $('.card#' + id + ' .field.' + carac)
  var t = $this.val() || $this.text()
  return getModValue(t)
}

function getModValue(n) {
  var x = (~~(n / 2) - 5)
  x = x < 0 ? x + "" : "+" + x
  return x
}

function getBonusValue(n) {
  return "+" + (Math.ceil(n / 4) + 1)
}
