import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { omit } from 'lodash'
import navigation from '../common/navigation'

let autoid = 0

class Focusable extends PureComponent {
  constructor (props) {
    super(props)

    this.id = props.id || `focusable-${++autoid}`
  }

  getChildContext () {
    return {
      parent: this.id
    }
  }

  componentWillUnmounnt () {
    navigation.unregister(this.id)
  }

  render () {
    const { parent, type, orientation, onFocus, onBlur, onSelect, onMove } = this.props

    navigation.register(this.id, {
      parent: parent || this.context.parent,
      orientation,
      onFocus,
      onBlur,
      onSelect,
      onMove
    })

    return React.createElement(type, {
      ...omit(this.props, [
        'type',
        'orientation',
        'onFocus',
        'onBlur',
        'onSelect',
        'onMove'
      ]),
      id: this.id
    })
  }
}

Focusable.propTypes = {
  id: PropTypes.string,
  parent: PropTypes.string,
  type: PropTypes.string,
  orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSelect: PropTypes.func,
  onMove: PropTypes.func
}

Focusable.defaultProps = {
  type: 'div'
}

Focusable.childContextTypes = {
  parent: PropTypes.string.isRequired
}

Focusable.contextTypes = {
  parent: PropTypes.string
}

export default Focusable
