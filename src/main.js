import 'babel-polyfill'
import 'raf/polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import navigation from './common/navigation'
import Focusable from './components/Focusable'
import Home from './components/Home'
import reducer from './redux'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <Focusable id='root'>
      <Home />
    </Focusable>
  </Provider>,
  document.getElementById('app'),
  () => navigation.focus('root')
)
