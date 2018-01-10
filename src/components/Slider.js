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
  headPosition = 0
  slider = null

  componentDidMount () {
    const { id, children } = this.props

    this.slider = document.getElementById(id)

    setTimeout(() => {
      const slideWidth = getComputedWidth(this.slider.children[0])
      const activeIndex = children.length

      navigation.setActiveIndex(id, activeIndex)

      this.headPosition = this.position = -(slideWidth * activeIndex)
      this.tailPosition = (this.headPosition * 2) + (slideWidth)

      moveElement({
        el: this.slider,
        skipAnim: true,
        to: {
          x: this.position
        }
      })
    })
  }

  handleMove = (event) => {
    const { id, children } = this.props
    const { offset, enter } = event
    const enterEl = document.getElementById(enter.id)
    const size = getComputedWidth(enterEl)

    let onComplete

    if (enterEl.parentNode.getAttribute('data-slide-role') === 'clone') {
      if (offset === 1) {
        onComplete = () => {
          moveElement({
            el: this.slider,
            skipAnim: true,
            to: {
              x: this.headPosition
            }
          })
          this.position = this.headPosition
          navigation.setActiveIndex(id, children.length)
        }
      } else {
        onComplete = () => {
          moveElement({
            el: this.slider,
            skipAnim: true,
            to: {
              x: this.tailPosition
            }
          })
          this.position = this.tailPosition
          navigation.setActiveIndex(id, (children.length * 2) - 1)
        }
      }
    }

    this.position = offset === 1
      ? this.position - size
      : this.position + size

    moveElement({
      el: this.slider,
      to: {
        x: this.position
      },
      onComplete
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
