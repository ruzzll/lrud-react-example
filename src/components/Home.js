import React, { PureComponent } from 'react'
import { StyleSheet, css } from 'aphrodite'
import Slider from './Slider'
import Card from './Card'
import Focusable from './Focusable'

const bundle = {
  items: [{
    imgURL: '//source.unsplash.com/random/$recipe?bust=1'
  }, {
    imgURL: '//source.unsplash.com/random/$recipe?bust=2'
  }, {
    imgURL: '//source.unsplash.com/random/$recipe?bust=3'
  }, {
    imgURL: '//source.unsplash.com/random/$recipe?bust=4'
  }, {
    imgURL: '//source.unsplash.com/random/$recipe?bust=5'
  }]
}

const bundles = [
  { id: 'bundle-1', title: 'First Bundle', ...bundle }
]

class Home extends PureComponent {
  render () {
    return (
      <div>
        <div className={css(styles.bundles)}>
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
        </div>
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
