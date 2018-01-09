import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import navigation from './common/navigation'
import Focusable from './components/Focusable'
import Home from './components/Home'

render(
  <Focusable id='root'>
    <Home />
  </Focusable>,
  document.getElementById('app'),
  () => navigation.focus('root')
)
