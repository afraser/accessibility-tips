# handleClickIntent

We often run into times when we want a non-button to behave like one.
Minimally, this means we should be able to "click" it by focusing it with the keyboard and then pressing ENTER or SPACE.

`handleClickIntent` is a higher-order helper function that makes our lives easier in this way.

eg:
```js
<Icon
  name={liked ? 'thumbs-up-checked' : 'thumbs-up'}
  tabIndex='0'                                      // I'm focusable! (IMPORTANT)
  onClick={onClick}
  onKeyPress={handleClickIntent(onClick)}           // Allow keyboard click
  role='button'                                     // Tell screenreaders I'm a button
  aria-label={liked ? 'unlike this' : 'like this'}  // Tell screenreaders what to say on focus. Not just "button".
/>
```

This is also useful for custom components like collapsible sections etc. but there are a lot of other aria-related caveats there.


## Using React hooks (for use in functional components only)

```js
const handleClickIntent = (handler) =>
  React.useCallback((evt) => {
    if (handler && evt.keyCode in [13, 32]) {
      handler(evt)
    }
  }, [handler])
```

## General implementation (less performant).

```js
const handleClickIntent = (handler) =>
  if (handler && evt.keyCode in [13, 32]) {
    handler(evt)
  }
```
