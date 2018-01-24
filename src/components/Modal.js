import PropTypes from 'prop-types'
import React from 'react'

import Link from './Link'

const Modal = ({ open, toggle }) => {
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
          <p className="mt0">
            <strong>Better Know Your Area</strong> provides an at-a-glance view
            of social, economic, demographic, and housing characteristics across
            the United States. All numbers are presented alongside state and
            national statistics for context.
          </p>
          <p className="mt0">
            Our goal is to make it easier to learn about the places you care
            about and highlight some interesting and publicly available data
            about the American people.
          </p>
          <p className="mt0">
            All data comes from the U.S. Census Bureau's American Community
            Survey (2016 5-year estimates).
          </p>
          <p className="mt0">
            Have a question or suggestion?{' '}
            <Link
              href="mailto:brendansudol@gmail.com?Subject=Better%20Know%20Your%20Area"
              className="red"
            >
              We'd love to hear it.
            </Link>
          </p>
          <div className="mt3 h6">
            <Link
              external
              href="https://github.com/brendansudol/better-know-your-area"
              className="mr2 black"
            >
              Code on GitHub
            </Link>
            <Link
              external
              href="https://twitter.com/brensudol"
              className="black"
            >
              Made by @brensudol
            </Link>
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
