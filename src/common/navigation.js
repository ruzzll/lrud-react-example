import Lrud from 'lrud'

const navigation = new Lrud()

navigation.on('move', (event) => {
  const node = navigation.nodes[event.id]
  if (node && node.onMove) {
    node.onMove({ ...event, ...node })
  }
})

document.onkeydown = function (event) {
  if (Lrud.KEY_CODES[event.keyCode]) {
    navigation.handleKeyEvent(event)
    event.preventDefault()
  }
}

export default navigation
