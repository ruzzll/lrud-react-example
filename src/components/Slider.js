import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { StyleSheet, css } from 'aphrodite'
import Focusable from './Focusable'

const int = (n) => parseInt(n, 10)
const getComputedWidth = (style) => int(style.width) + int(style.marginLeft) + int(style.marginRight)
const getComputedHeight = (style) => int(style.height) + int(style.marginTop) + int(style.marginBottom)
const isRightDown = ({ orientation, offset }) => (orientation === 'horizontal' && offset === 1) || (orientation === 'vertical' && offset === 1)

class Slider extends PureComponent {
  state = {
    position: 0
  }

  handleMove = (event) => {
    const { orientation, enter, leave } = event
    const { position } = this.state

    const elementId = (isRightDown(event) ? enter : leave).id
    const element = document.getElementById(elementId)
    const style = window.getComputedStyle(element)
    const size = orientation === 'horizontal' ? getComputedWidth(style) : getComputedHeight(style)

    this.setState({
      position: isRightDown(event) ? position - size : position + size
    })
  }

  render () {
    const { id, className, orientation, children } = this.props
    const { position } = this.state
    const axis = orientation === 'horizontal' ? 'X' : 'Y'
    const transform = `translate${axis}(${position}px)`

    return (
      <Focusable
        id={id}
        className={classNames('Slider', className, css(styles.slider))}
        orientation={orientation}
        onMove={this.handleMove}
        style={{
          transform,
          webkitTransform: transform,
          mozTransform: transform,
          oTransform: transform
        }}
      >
        {children}
      </Focusable>
    )
  }
}

const styles = StyleSheet.create({
  slider: {
    whiteSpace: 'nowrap',
    transition: 'all 200ms linear'
  }
})

Slider.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
  children: PropTypes.any
}

Slider.defaultProps = {
  orientation: 'horizontal'
}

export default Slider
