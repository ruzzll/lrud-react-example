import React, { PureComponent } from 'react'
import { StyleSheet, css } from 'aphrodite'
import Slider from './Slider'
import Card from './Card'
import Focusable from './Focusable'

const bundle1 = {
  id: 'box-sets-bundle',
  title: 'Box Sets',
  items: [{
    imgURL: '//ichef.bbci.co.uk/images/ic/$recipe/p05rtgfm.jpg'
  }, {
    imgURL: '//ichef.bbci.co.uk/images/ic/$recipe/p05rth3n.jpg'
  }, {
    imgURL: '//ichef.bbci.co.uk/images/ic/$recipe/p05r7g08.jpg'
  }, {
    imgURL: '//ichef.bbci.co.uk/images/ic/$recipe/p05r775t.jpg'
  }, {
    imgURL: '//ichef.bbci.co.uk/images/ic/$recipe/p05rtfwy.jpg'
  }, {
    imgURL: '//ichef.bbci.co.uk/images/ic/$recipe/p05r7547.jpg'
  }]
}

const bundles = [ bundle1 ]

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
    height: '7.6em',
    width: '13.6em',
    bottom: '4.9em',
    left: '4.8em',
    border: '0.2em solid white'
  },
  title: {
    padding: '0.5em 0'
  }
})

export default Home
