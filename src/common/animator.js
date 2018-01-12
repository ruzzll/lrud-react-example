import TWEEN from 'tween.js'

const setProperty = (el, prop, value = '') => {
  el.style.setProperty(`-webkit-${prop}`, value)
  el.style.setProperty(`-ms-${prop}`, value)
  el.style.setProperty(prop, value)
}

export const moveElement = ({ el, duration = 200, from = {}, to = {}, onComplete, skipAnim }) => {
  let rafid = null

  if (!el) throw new Error('Invalid element')

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
      window.cancelAnimationFrame(rafid)
      onComplete && onComplete()
    })

  const animate = (time) => {
    rafid = window.requestAnimationFrame(animate)
    TWEEN.update(time)
  }

  tween.start()
  animate()

  return tween
}
