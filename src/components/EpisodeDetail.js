import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'
import { getFocused } from '../redux'

class EpisodeDetail extends PureComponent {
  render () {
    const { title, subtitle, description } = this.props

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.title)}>
          {title}
        </div>
        <div className={css(styles.subtitle)}>
          {subtitle}
        </div>
        <div className={css(styles.description)}>
          {description}
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: '2.5em 5em',
    width: '22em'
  },
  title: {
    fontSize: '1.5em',
    marginBottom: '0.2em'
  },
  subtitle: {
    fontSize: '0.8em',
    color: '#b2b7c4'
  },
  description: {
    fontSize: '0.9em',
    color: '#b2b7c4',
    marginTop: '0.5em'
  }
})

EpisodeDetail.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string
}

const mapStateToProps = (state) => ({
  ...getFocused(state)
})

export default connect(mapStateToProps)(EpisodeDetail)
