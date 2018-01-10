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
    height: '7.6em',
    width: '13.6em'
  }
})

Card.propTypes = {
  className: PropTypes.string,
  imgURL: PropTypes.string.isRequired
}

export default Card
