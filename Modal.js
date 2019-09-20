import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Fadeable } from 'js/components'
import Keycode from 'js/util/keycode'
import tabbable from 'tabbable'
import css from './Modal.sass'

export default class Modal extends Component {
  node = null

  render () {
    const {
      show, onClose, title, className, children
    } = this.props

    let titleTag
    if (title) {
      titleTag = <h2 className={css.titlebar} id='modalTitle'>{ title }</h2>
    }

    return (
      <Fadeable
        show={show}
        slideIn='down'
        className={cx(css.wrapper, className)}
      >
        <div ref={node => { this.node = node }}>
          <div className={css.veil} onClick={onClose} />
          <div
            className={css.container}
            role='dialog'
            aria-labelledby='modalTitle'
            tabIndex={0}
            onKeyDown={::this.handleKeyDown}
          >
            { titleTag }
            <div className={css.content}>
              { children }
            </div>
          </div>
        </div>
      </Fadeable>
    )
  }

  componentDidMount () {
    if (this.props.show) {
      this.handleShown()
    }
  }

  componentWillUnmount () {
    this.handleHidden()
  }

  componentDidUpdate (prevProps) {
    if (this.props.show && !prevProps.show) {
      this.handleShown()
    } else if (!this.props.show && prevProps.show) {
      this.handleHidden()
    }
  }

  handleShown () {
    this.autoFocus()
    this.props.onShown()
  }

  handleHidden () {
    this.restoreFocus()
    this.props.onHidden()
  }

  handleKeyDown (evt) {
    if (Keycode(evt).is('esc')) {
      this.props.onClose()
    } else if (Keycode(evt).is('tab')) {
      // Prevent the user from tabbing to elements outside of the modal
      // We do this on keydown to catch the event before focus is advanced
      const tabbables = this.tabbableElements
      const first = tabbables[0]
      const last = tabbables[tabbables.length - 1]

      if (evt.target === last && !evt.shiftKey) {
        first.focus()
        evt.preventDefault()
      } else if (evt.target === first && evt.shiftKey) {
        last.focus()
        evt.preventDefault()
      }
    }
  }

  get tabbableElements () {
    return tabbable(this.node)
  }

  autoFocus () {
    this.previouslyFocusedElement = document.activeElement
    if (this.props.autoFocus && this.tabbableElements.length) {
      this.tabbableElements[0].focus()
    }
  }

  restoreFocus () {
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus()
    }
  }
}

Modal.propTypes = {
  autoFocus: PropTypes.bool,
  onHidden: PropTypes.func,
  onShown: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  padding: PropTypes.string,
  show: PropTypes.bool,
  title: PropTypes.string,
  width: PropTypes.number
}

Modal.defaultProps = {
  show: false,
  padding: '2em',
  autoFocus: true,
  onShown: () => {},
  onHidden: () => {}
}
