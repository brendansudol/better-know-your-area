import PropTypes from 'prop-types'
import React from 'react'

const Modal = ({ children, open, toggle }) => {
  const fixed = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }

  const sx = {
    root: {
      ...fixed,
      zIndex: 1001,
      display: open ? 'flex' : 'none',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dismiss: {
      ...fixed,
      backgroundColor: 'rgb(17, 17, 17)',
      opacity: 0.875,
    },
    inner: {
      position: 'relative',
      zIndex: 1,
      minWidth: 320,
      maxWidth: 500,
      overflow: 'scroll',
    },
  }

  return (
    <div style={sx.root}>
      <div style={sx.dismiss} onClick={toggle} />
      <div className="m2" style={sx.inner}>
        <div className="p2 sm-p3 bg-white">
          <p className="mt0">TODO...</p>
          <div className="h5">
            <a href="#!" className="mr2">
              Link 1
            </a>
            <a href="#!">Link 1</a>
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

Modal.defaultProps = {
  open: false,
}

export default Modal
