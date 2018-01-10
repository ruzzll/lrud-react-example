import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { StyleSheet, css } from 'aphrodite'
import Focusable from './Focusable'
import { resolution } from '../common/device'

const recipes = {
  540: '203x114',
  720: '272x153',
  1080: '406x228'
}

const imgSrc = (src) => src.replace('$recipe', recipes[resolution])

class Card extends PureComponent {
  render () {
    const { className, id, imgURL, title, subtitle, description, onFocus } = this.props
    const data = { id, title, subtitle, description }

    return (
      <Focusable
        className={classNames(className, css(styles.card))}
        onFocus={onFocus}
        data={data}
      >
        <img src={imgSrc(imgURL)} />
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
  onFocus: PropTypes.func
}

export default Card
