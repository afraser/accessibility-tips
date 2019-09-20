//
// 1
//

<Icon
  name={liked ? 'thumbs-up-checked' : 'thumbs-up'}
  tabIndex='0'
  aria-label={liked ? 'unlike this' : 'like this'}
  onClick={onClick}
  onKeyPress={handleClickIntent(onClick)}
/>




// For functional components only
const handleClickIntent = (handler) =>
  React.useCallback((evt) => {
    if (handler && evt.keyCode in [13, 32]) {
      handler(evt)
    }
  }, [handler])


const handleClickIntent = (handler) =>
  if (handler && evt.keyCode in [13, 32]) {
    handler(evt)
  }
