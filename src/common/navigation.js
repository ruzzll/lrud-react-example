import Lrud from 'lrud'
import { throttle } from 'lodash'

const navigation = new Lrud()

navigation.on('move', (event) => {
  const node = navigation.nodes[event.id]
  node.onMove && node.onMove(event)
})

navigation.on('focus', (id) => {
  const node = navigation.nodes[id]
  node.onFocus && node.onFocus(node)
})

document.onkeydown = throttle((event) => {
  if (Lrud.KEY_CODES[event.keyCode]) {
    navigation.handleKeyEvent(event)
    event.preventDefault()
  }
}, 210)

export default navigation
