import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { StyleSheet, css } from 'aphrodite'
import Focusable from './Focusable'
import { resolution } from '../common/device'

const recipes = {
  540: '210x120',
  720: '280x160',
  1080: '420x240'
}

const imgSrc = (src) => src.replace('$recipe', recipes[resolution])

class Card extends PureComponent {
  render () {
    const { className, imgURL } = this.props

    return (
      <Focusable className={classNames(className, css(styles.card))}>
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
    height: '8em',
    width: '14em'
  }
})

Card.propTypes = {
  className: PropTypes.string,
  imgURL: PropTypes.string.isRequired
}

export default Card
