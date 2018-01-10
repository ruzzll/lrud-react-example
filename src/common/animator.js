const TWEEN = require('tween.js')

const setProperty = (el, prop, value = '') => {
  el.style.setProperty(`-webkit-${prop}`, value)
  el.style.setProperty(`-ms-${prop}`, value)
  el.style.setProperty(prop, value)
}

function tween (options) {
  const { el, duration = 200, from = {}, to = {}, onComplete, skipAnim } = options

  if (skipAnim) {
    const x = to.x || 0
    const y = to.y || 0

    return setProperty(el, 'transform', `translate(${x}px, ${y}px)`)
  }

  const tween = new TWEEN.Tween(from)
    .to(to, duration)
    .onUpdate(function () {
      const x = this.x || 0
      const y = this.y || 0

      setProperty(el, 'transform', `translate(${x}px, ${y}px)`)
    })
    .onComplete(() => {
      onComplete && onComplete()
    })

  const animate = (time) => {
    window.requestAnimationFrame(animate)
    TWEEN.update(time)
  }

  tween.start()
  animate()

  return tween
}

export const moveElement = (options) => tween(options)
