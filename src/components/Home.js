import React, { PureComponent } from 'react'
import { StyleSheet, css } from 'aphrodite'
import Slider from './Slider'
import Card from './Card'

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
      <div className='Home'>
        <Slider
          className={css(styles.container)}
          orientation='vertical'
        >
          {bundles.map((bundle, i) => (
            <Slider
              key={i}
              id={bundle.id}
              className={css(styles.bundle)}
            >
              {bundle.items.map((item, i) => (
                <Card
                  key={i}
                  {...item}
                />
              ))}
            </Slider>
          ))}
        </Slider>
        <div className={css(styles.focus)} />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '14em',
    padding: '0 5em'
  },
  bundle: {
    marginBottom: '0.5em'
  },
  focus: {
    position: 'absolute',
    height: '8em',
    width: '14em',
    bottom: '5.8em',
    left: '4.8em',
    border: '0.2em solid white'
  }
})

export default Home
