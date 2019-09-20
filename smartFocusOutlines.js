//
// 5. Smart focus outlines
//

function hasClass (el, className) {
  return el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function enableSmartFocusOutlines () {
  // Get some global styles
  require('styles/globalFocusOutlines.sass')

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 9) { // tab
      document.body.className = document.body.className
        .replace(new RegExp('(?:^|\\s)' + 'hide-focus-outlines' + '(?:\\s|$)'), ' ')
        .trim()
    }
  })

  document.addEventListener('mousedown', function (evt) {
    if (!hasClass(document.body, 'hide-focus-outlines')) {
      document.body.className += ' hide-focus-outlines'
    }
  })
}
