import React, { PureComponent } from 'react'
import { StyleSheet, css } from 'aphrodite'
import Slider from './Slider'
import Card from './Card'
import Focusable from './Focusable'

const bundle = {
  items: [{
    imgURL: '//via.placeholder.com/$recipe'
  }, {
    imgURL: '//via.placeholder.com/$recipe'
  }, {
    imgURL: '//via.placeholder.com/$recipe'
  }, {
    imgURL: '//via.placeholder.com/$recipe'
  }, {
    imgURL: '//via.placeholder.com/$recipe'
  }]
}

const bundles = [
  { id: 'bundle-1', title: 'First Bundle', ...bundle },
  { id: 'bundle-2', title: 'Second Bundle', ...bundle },
  { id: 'bundle-3', title: 'Third Bundle', ...bundle }
]

class Home extends PureComponent {
  render () {
    return (
      <div>
        <Slider
          className={css(styles.bundles)}
          orientation='vertical'
        >
          {bundles.map((bundle, i) => (
            <Focusable key={i}>
              <h3 className={css(styles.title)}>
                {bundle.title}
              </h3>
              <Slider id={bundle.id}>
                {bundle.items.map((item, i) => (
                  <Card
                    key={i}
                    {...item}
                  />
                ))}
              </Slider>
            </Focusable>
          ))}
        </Slider>
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
    height: '15em',
    padding: '0 5em'
  },
  focus: {
    position: 'absolute',
    height: '8em',
    width: '14em',
    bottom: '4.5em',
    left: '4.8em',
    border: '0.2em solid white'
  },
  title: {
    padding: '0.5em 0'
  }
})

export default Home
