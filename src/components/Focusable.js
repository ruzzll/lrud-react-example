import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { uniqueId, pick, omit } from 'lodash'
import navigation from '../common/navigation'

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

    this.id = props.id || uniqueId('focusable_')
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

    navigation.register(id, Object.assign(
      { parent },
      pick(this.props, navProps))
    )

    return React.createElement('div', Object.assign(
      { id },
      omit(this.props, navProps))
    )
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
