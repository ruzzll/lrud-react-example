import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { pick, omit } from 'lodash'
import navigation from '../common/navigation'

let autoid = 0

const navigationProps = [
  'type',
  'orientation',
  'onFocus',
  'onBlur',
  'onSelect',
  'onMove',
  'data'
]

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
    navigation.register(this.id, {
      parent: this.context.parent,
      ...pick(this.props, navigationProps)
    })

    return React.createElement(this.props.type, {
      id: this.id,
      ...omit(this.props, navigationProps)
    })
  }
}

Focusable.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string
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
