import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { StyleSheet, css } from 'aphrodite'
import Focusable from './Focusable'
import navigation from '../common/navigation'
import { getComputedWidth } from '../common/device'
import { moveElement } from '../common/animator'

class Bundle extends PureComponent {
  position = 0
  headPosition = 0
  tailPosition = 0
  slider = null
  tween = null

  componentDidMount () {
    this.slider = document.getElementById(this.props.id)
    setTimeout(this.alignInitial.bind(this))
  }

  alignInitial () {
    const { id, children } = this.props
    const slideWidth = getComputedWidth(this.slider.children[0])
    const activeIndex = children.length

    navigation.setActiveIndex(id, activeIndex)

    this.headPosition = this.position = -(slideWidth * activeIndex)
    this.tailPosition = (this.headPosition * 2) + (slideWidth)

    moveElement({
      el: this.slider,
      skipAnim: true,
      from: {
        x: 0
      },
      to: {
        x: this.position
      }
    })
  }

  alignHead () {
    const { id, children } = this.props

    moveElement({
      el: this.slider,
      skipAnim: true,
      from: {
        x: this.position
      },
      to: {
        x: this.headPosition
      }
    })

    this.position = this.headPosition
    navigation.setActiveIndex(id, children.length)
  }

  alignTail () {
    const { id, children } = this.props

    moveElement({
      el: this.slider,
      skipAnim: true,
      from: {
        x: this.position
      },
      to: {
        x: this.tailPosition
      }
    })

    this.position = this.tailPosition
    navigation.setActiveIndex(id, (children.length * 2) - 1)
  }

  handleMove = (event) => {
    const { offset, enter } = event
    const enterEl = document.getElementById(enter.id)
    const size = getComputedWidth(enterEl)

    let onComplete

    if (enterEl.parentNode.dataset.role === 'clone') {
      onComplete = offset === 1
        ? this.alignHead.bind(this)
        : this.alignTail.bind(this)
    }

    const currPos = this.position
    const nextPos = offset === 1
      ? this.position - size
      : this.position + size

    this.twee && this.tween.stop()
    this.tween = moveElement({
      el: this.slider,
      duration: 200,
      from: {
        x: currPos
      },
      to: {
        x: nextPos
      },
      onComplete
    })

    this.position = nextPos
  }

  buildSlide = (role) => (child) => {
    return (
      <div
        data-role={role}
        className={css(styles.slide)}
      >
        {child}
      </div>
    )
  }

  buildSlides (children) {
    return [
      React.Children.map(children, this.buildSlide('clone')),
      React.Children.map(children, this.buildSlide()),
      React.Children.map(children, this.buildSlide('clone'))
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
    whiteSpace: 'nowrap'
  },
  slide: {
    display: 'inline-block',
    verticalAlign: 'top'
  }
})

Bundle.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  orientation: PropTypes.oneOf([
    'vertical',
    'horizontal'
  ]),
  children: PropTypes.any
}

Bundle.defaultProps = {
  orientation: 'horizontal'
}

export default Bundle
