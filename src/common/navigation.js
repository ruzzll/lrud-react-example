import Lrud from 'lrud'
import { throttle } from 'lodash'

const navigation = new Lrud()

navigation.on('move', (event) => {
  const node = navigation.nodes[event.id]
  if (node && node.onMove) {
    node.onMove({ ...event, ...node })
  }
})

navigation.on('focus', (id) => {
  const node = navigation.nodes[id]
  if (node && node.onFocus) {
    node.onFocus(node)
  }
})

// TODO: Implement in Lrud
navigation.setActiveIndex = (id, index) => {
  const node = navigation.nodes[id]
  if (node) {
    node.activeChild = node.children[index] || node.activeChild
  }
}

document.onkeydown = throttle((event) => {
  if (Lrud.KEY_CODES[event.keyCode]) {
    navigation.handleKeyEvent(event)
    event.preventDefault()
  }
}, 210)

export default navigation
