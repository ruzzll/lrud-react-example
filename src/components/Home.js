import React, { PureComponent } from 'react'
import { StyleSheet, css } from 'aphrodite'
import EpisodeDetail from './EpisodeDetail'
import BundleList from './BundleList'
import Bundle from './Bundle'
import Card from './Card'
import Focusable from './Focusable'
import bundles from '../feeds/bundles.json'

class Home extends PureComponent {
  render () {
    return (
      <div>
        <EpisodeDetail />
        <BundleList className={css(styles.bundles)}>
          {bundles.map((bundle, i) => (
            <Focusable key={i}>
              <div className={css(styles.title)}>
                {bundle.title}
              </div>
              <Bundle id={bundle.id}>
                {bundle.items.map((item, i) => (
                  <Card
                    key={i}
                    {...item}
                  />
                ))}
              </Bundle>
            </Focusable>
          ))}
        </BundleList>
        <div className={css(styles.focus)} />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  bundles: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20em',
    padding: '0 5em'
  },
  focus: {
    position: 'absolute',
    height: '7.6em',
    width: '13.6em',
    bottom: '9.4em',
    left: '4.8em',
    border: '0.2em solid white'
  },
  title: {
    padding: '1em 0 0.5em 0'
  }
})

export default Home
