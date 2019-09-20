//
// Button
//


// Desired API
<Button>Make it so</Button>
<Button busy>Make it so</Button>
<Button disabled>Make it so</Button>

// Button as a link
<Button href='http://rocketinsights.com' target='_blank'>
  rocketinsights.com
</Button>

// Submit button
<form onSubmit={handleSubmit}>
  <Input {...} />
  <Button type='submit'>Send into space</Button>
</form>

// Button as a router link
<Button Component={RouterLink} to='home'>Home</Button>





export default function Button ({
  block, busy, children, className, Component, disabled, href, onClick, onKeyDown, role, type = 'button',
  ...rest
}) {
  const isDisabled = disabled || busy

  const classes = cx(className, css.btn, {
    [css.block]: block,
    [css.disabled]: isDisabled,
  })

  // Calls onClick handler on space/enter if not rendered as a <button>
  const handleKeyDown = evt => {
    if (onClick && (Component || href) && (evt.keyCode in [13, 32])) {
      // If Component is rendered as an <a> with an href or a <button> the
      // browser will interpret these keyboard actions as clicks and fire the
      // onClick callback. We call preventDefault here to prevent calling
      // onClick twice for these cases. This has the added benefit of
      // preventing the page from scrolling when the space key is pressed.
      evt.preventDefault()
      onClick(evt)
    }
    if (onKeyDown) {
      onKeyDown(evt)
    }
  }

  const BtnComponent = Component || href ? 'a' : 'button'

  return (
    <BtnComponent
      aria-disabled={isDisabled}
      className={classes}
      href={href}
      onClick={!isDisabled ? onClick : null}
      onKeyDown={!isDisabled ? handleKeyDown : null}
      role={role || (href ? 'link' : 'button')}
      tabIndex={0}
      rel={rest.target === '_blank' ? 'noreferrer noopener' : undefined}
      type={BtnComponent === 'button' ? type : null}
      {...rest}
    >
      <span style={{ opacity: busy ? 0 : 1 }}>
        {children}
      </span>
      {busy && <Icon name='busy' spin className={css.busy} />}
    </BtnComponent>
  )
}
