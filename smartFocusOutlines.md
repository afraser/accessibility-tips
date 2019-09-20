# Smart focus outlines

Focus outlines are the blue (typically) fuzzy outlines you see around elements in the browser when you focus them. These are particularly useful for people with vision impairments and people who use a keyboard exclusively to navigate because the focused element may not be where the user is looking.

These outlines are unnecessary and aesthetically undesireable for people who use a cursor to navigate. E.g. Showing a focus outline around a button or input that you just clicked is not very helpful since these components have hover, focus, and active states of their own to indicate whether they are interactive or not.

Calling `enableSmartFocusOutlines()` will set up listeners to toggle showing focus outlines based on whether the user is using the keyboard to navigate or the mouse.

## Implementation:

```js
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
```

## Usage (in your app entrypoint):

```js
enableSmartFocusOutlines()
```
