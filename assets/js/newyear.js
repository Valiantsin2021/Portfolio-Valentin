// Logic from new year.txt adapted to Vanilla JS

;(function () {
  function isNewYearClose() {
    var d = new Date()
    return (d.getMonth() == 11 && d.getDate() >= 20) || (d.getMonth() == 0 && d.getDate() <= 10)
  }

  var is_garland_visible_on_page_load = localStorage.getItem('nnmnylights') != 'hide' && isNewYearClose()

  window.toggle_new_year = function () {
    var h = localStorage.getItem('nnmnylights') != 'hide'
    var wrap = document.querySelector('body') // Adjusted selector as .wrap doesn't exist, we might need a specific container
    // Original: $('body > .wrap').css('margin-top', h ? '0px' : '80px');
    // We will just toggle the class or style on the body or a main container
    if (wrap) {
      // logic to push content down if needed, but for now we focus on visibility
    }

    localStorage.setItem('nnmnylights', h ? 'hide' : 'show')
    var el = document.querySelector('.b-page_newyear')
    if (el) {
      el.style.display = h ? 'none' : 'block'
    }

    if (!is_garland_visible_on_page_load) window.location.reload()
    return false
  }

  // Web Audio API classes
  class Balls {
    constructor(context, buffer) {
      this.context = context
      this.buffer = buffer
    }

    setup() {
      this.gainNode = this.context.createGain()
      this.source = this.context.createBufferSource()
      this.source.buffer = this.buffer
      this.source.connect(this.gainNode)
      this.gainNode.connect(this.context.destination)
      this.gainNode.gain.setValueAtTime(1, this.context.currentTime)
    }

    play() {
      this.setup()
      this.source.start(this.context.currentTime)
    }

    stop() {
      var ct = this.context.currentTime + 1
      this.gainNode.gain.exponentialRampToValueAtTime(0.1, ct)
      this.source.stop(ct)
    }
  }

  class Buffer {
    constructor(context, urls) {
      this.context = context
      this.urls = urls
      this.buffer = []
    }

    loadSound(url, index) {
      var request = new XMLHttpRequest()
      request.open('get', url, true)
      request.responseType = 'arraybuffer'
      var thisBuffer = this
      request.onload = function () {
        thisBuffer.context.decodeAudioData(request.response, function (buffer) {
          thisBuffer.buffer[index] = buffer
          if (index == thisBuffer.urls.length - 1) {
            thisBuffer.loaded()
          }
        })
      }
      request.send()
    }

    getBuffer() {
      this.urls.forEach((url, index) => {
        this.loadSound(url, index)
      })
    }

    loaded() {
      this._loaded = true
    }

    getSound(index) {
      return this.buffer[index]
    }
  }

  var balls = null
  var preset = 0
  // Hardcoded path to assets
  var path = 'https://nnmstatic.win/forum/audio/'
  var sounds = []
  for (var i = 1; i <= 36; i++) {
    sounds.push(path + 'sound' + i + '.mp3')
  }

  var context = false
  var buffer, ballsSound
  try {
    context = new (window.AudioContext || window.webkitAudioContext)()
    buffer = new Buffer(context, sounds)
    ballsSound = buffer.getBuffer()
  } catch (e) {
    console.error('AudioContext not supported or error init', e)
  }

  function playBalls() {
    if (!context) return
    var note = this.getAttribute('data-note')
    if (!note) return

    var index = parseInt(note) + preset
    // ensure index is within bounds
    if (index >= 0 && buffer && buffer.getSound(index)) {
      balls = new Balls(context, buffer.getSound(index))
      balls.play()
    }
  }

  function stopBalls() {
    if (balls) balls.stop()
  }

  function ballBounce(e) {
    var i = e
    if (i.className.indexOf(' bounce') > -1) {
      return
    }
    toggleBounce(i)
  }

  function toggleBounce(i) {
    i.classList.add('bounce')
    function n() {
      i.classList.remove('bounce')
      i.classList.add('bounce1')
      function o() {
        i.classList.remove('bounce1')
        i.classList.add('bounce2')
        function p() {
          i.classList.remove('bounce2')
          i.classList.add('bounce3')
          function q() {
            i.classList.remove('bounce3')
          }
          setTimeout(q, 300)
        }
        setTimeout(p, 300)
      }
      setTimeout(o, 300)
    }
    setTimeout(n, 300)
  }

  // Init logic
  document.addEventListener('DOMContentLoaded', function () {
    if (!isNewYearClose()) {
      return
    }

    // Inject HTML if not present (we will manually add it to index.html, but if we wanted to be fully dynamic...)
    // For now, we assume HTML is in index.html, but hidden if not new year.

    var pageNewYear = document.querySelector('.b-page_newyear')
    if (!pageNewYear) return

    if (localStorage.getItem('nnmnylights') == 'hide') {
      pageNewYear.style.display = 'none'
      // $('body > .wrap').css('margin-top', '0px');
      return
    } else {
      pageNewYear.style.display = 'block'
      // $('body > .wrap').css('margin-top', '80px');
    }

    var buttons = document.querySelectorAll('.b-ball_bounce')
    buttons.forEach(function (button) {
      button.addEventListener('mouseenter', playBalls)
      button.addEventListener('mouseleave', stopBalls)
      button.addEventListener('mouseenter', function () {
        ballBounce(this)
      })
      // Handle child elements if needed, but event bubbling handles the button logic usually
    })

    // Keyboard support
    if (!context) return
    var l = [
      '49',
      '50',
      '51',
      '52',
      '53',
      '54',
      '55',
      '56',
      '57',
      '48',
      '189',
      '187',
      '81',
      '87',
      '69',
      '82',
      '84',
      '89',
      '85',
      '73',
      '79',
      '80',
      '219',
      '221',
      '65',
      '83',
      '68',
      '70',
      '71',
      '72',
      '74',
      '75',
      '76',
      '186',
      '222',
      '220'
    ]
    var k = ['90', '88', '67', '86', '66', '78', '77', '188', '190', '191']
    var a = {}
    for (var e = 0, c = l.length; e < c; e++) {
      a[l[e]] = e
    }
    for (var _e = 0, _c = k.length; _e < _c; _e++) {
      a[k[_e]] = _e
    }

    document.addEventListener('keydown', function (j) {
      if (j.which in a) {
        var index = parseInt(a[j.which])
        if (buffer && buffer.getSound(index)) {
          balls = new Balls(context, buffer.getSound(index))
          balls.play()
          var ball = document.querySelector('[data-note="' + index + '"]')
          if (ball) toggleBounce(ball)
        }
      }
    })
  })
})()
