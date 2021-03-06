import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'
import Focusable from './Focusable'
import { updateFocus } from '../redux'

class Card extends PureComponent {
  handleOnFocus = ({ data }) => {
    this.props.updateFocus(data)
  }

  render () {
    const { className, id, imgURL, title, subtitle, description } = this.props
    const data = { id, title, subtitle, description }

    return (
      <Focusable
        className={classNames(className, css(styles.card))}
        data={data}
        onFocus={this.handleOnFocus}
      >
        <img src={imgURL} />
      </Focusable>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginRight: '0.5em',
    height: '7.6em',
    width: '13.6em'
  }
})

Card.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  updateFocus: PropTypes.func.isRequired
}

export default connect(null, { updateFocus })(Card)
