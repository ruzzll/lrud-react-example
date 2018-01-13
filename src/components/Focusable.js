import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { pick, omit } from 'lodash'
import navigation from '../common/navigation'

let autoid = 0

const navProps = [
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
    const { parent } = this.context
    const id = this.id

    navigation.register(id, { parent, ...pick(this.props, navProps) })

    return React.createElement('div', { id, ...omit(this.props, navProps) })
  }
}

Focusable.propTypes = {
  id: PropTypes.string
}

Focusable.childContextTypes = {
  parent: PropTypes.string.isRequired
}

Focusable.contextTypes = {
  parent: PropTypes.string
}

export default Focusable
