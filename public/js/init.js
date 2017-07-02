$(document).ready(function () {
  $('.button-collapse').sideNav();
  $('select').material_select();
  $('.modal').modal();
  $('.rollDice').click(function () {
    var result = rollDice($(this).text())
    var selector = $(this).attr("data-result-selector")
    $(selector).text(result.result)
  })
  var granimGradients = [
                ['#ffb347', '#ffcc33'],
                ['#beff56', '#72ff33'],
                ['#83d4af', '#bcffb6'],
                ['#83a4d4', '#b6fbff'],
                ['#9D50BB', '#6E48AA'],
            ]
  var granimFull = new Granim({
    element: '#full-gradient',
    direction: 'radial',
    opacity: [1, 1],
    isPausedWhenNotInView: true,
    states: {
      "default-state": {
        gradients: granimGradients
      }
    }
  })
  $('body').on('click', '.activator', function () {
    var $reveal = $(this)
      .parent()
      .next()
    $(this)
      .parents('.card')
      .parent()
      .toggleClass('l4 m6')
  })
  $('body').on('click.card', '.card', function (e) {
    if ($(this).find('> .card-reveal').length) {
      if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
        // Make Reveal animate down and display none
        $(this).find('.card-reveal').velocity({
          translateY: 0
        }, {
          duration: 225,
          queue: false,
          easing: 'easeInOutQuad',
          complete: function () {
            $(this).css({
              display: 'none'
            });
          }
        });
        $(this).velocity({
          height: $(this).data('height')
        }, {
          duration: 225
        });
      } else if ($(e.target).is($('.card .activator')) ||
        $(e.target).is($('.card .activator i'))) {
        $(e.target).closest('.card').css('overflow', 'hidden');
        $(this).data('height', $(this).css('height')).find('.card-reveal').css({
          display: 'block',
          height: 'auto'
        }).velocity("stop", false).velocity({
          translateY: '-100%'
        }, {
          duration: 300,
          queue: false,
          easing: 'easeInOutQuad'
        });
        $(this).velocity({
          height: $(this).find('.card-reveal').height() + 40
        }, {
          duration: 300
        });
      }
    }
    $('.card-reveal').closest('.card').css('overflow', 'hidden');
  });
})
