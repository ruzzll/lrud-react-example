import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { StyleSheet, css } from 'aphrodite'
import { getComputedWidth } from '../common/device'
import Focusable from './Focusable'
import navigation from '../common/navigation'
import { moveElement } from '../common/animator'

class Slider extends PureComponent {
  position = 0
  sliderEl = null

  componentDidMount () {
    const { id, children } = this.props

    this.sliderEl = document.getElementById(id)

    setTimeout(() => {
      const slideWidth = getComputedWidth(this.sliderEl.children[0])
      const activeIndex = children.length

      navigation.setActiveIndex(id, activeIndex)
      this.position = -(slideWidth * activeIndex)

      moveElement({
        el: this.sliderEl,
        skipAnim: true,
        to: {
          x: this.position
        }
      })
    })
  }

  handleMove = (event) => {
    const { offset, enter, leave } = event
    const id = (offset === 1 ? enter : leave).id
    const size = getComputedWidth(document.getElementById(id))

    this.position = offset === 1
      ? this.position - size
      : this.position + size

    moveElement({
      el: this.sliderEl,
      to: {
        x: this.position
      }
    })
  }

  buildSlide (child, role) {
    return (
      <div
        data-slide-role={role}
        className={css(styles.slide)}
      >
        {child}
      </div>
    )
  }

  buildSlides (children) {
    return [
      React.Children.map(children, (child, i) => this.buildSlide(child, 'clone')),
      React.Children.map(children, (child, i) => this.buildSlide(child)),
      React.Children.map(children, (child, i) => this.buildSlide(child, 'clone'))
    ]
  }

  render () {
    const { id, className, orientation, children } = this.props

    return (
      <Focusable
        id={id}
        className={classNames(className, css(styles.slider))}
        orientation={orientation}
        onMove={this.handleMove}
      >
        {this.buildSlides(children)}
      </Focusable>
    )
  }
}

const styles = StyleSheet.create({
  slider: {
    whiteSpace: 'nowrap',
    backfaceVisibility: 'hidden',
    perspective: 1000
  },
  slide: {
    display: 'inline-block',
    verticalAlign: 'top'
  }
})

Slider.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  orientation: PropTypes.oneOf([
    'vertical',
    'horizontal'
  ]),
  children: PropTypes.any
}

Slider.defaultProps = {
  orientation: 'horizontal'
}

export default Slider
