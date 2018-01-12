import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Focusable from './Focusable'
import { getComputedHeight } from '../common/device'
import { fade, moveElement } from '../common/animator'

const id = 'bundle-list'

class BundleList extends PureComponent {
  position = 0

  componentDidMount () {
    this.slider = document.getElementById(id)
  }

  handleMove = (event) => {
    const { offset, enter, leave } = event
    const enterElement = document.getElementById(enter.id)
    const leaveElement = document.getElementById(leave.id)
    const size = getComputedHeight(enterElement)

    const currPos = this.position
    const nextPos = offset === 1 ? this.position - size : this.position + size

    if (offset === 1) {
      fade({
        el: leaveElement,
        duration: 350,
        from: 1,
        to: 0
      })
    } else {
      fade({
        el: enterElement,
        duration: 350,
        from: 0,
        to: 1
      })
    }

    this.tween && this.tween.stop()
    this.tween = moveElement({
      el: this.slider,
      duration: 350,
      from: {
        y: currPos
      },
      to: {
        y: nextPos
      }
    })

    this.position = nextPos
  }

  render () {
    const { className, children } = this.props

    return (
      <Focusable
        id={id}
        className={className}
        orientation='vertical'
        onMove={this.handleMove}
      >
        {children}
      </Focusable>
    )
  }
}

BundleList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default BundleList
