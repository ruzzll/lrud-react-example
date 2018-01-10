const vendorPrefixes = [ '-webkit-', '-moz-', '-o-' ]

const trainsitionEndEvents = [
  'webkitTransitionEnd',
  'oTransitionEnd',
  'otransitionend',
  'transitionend'
]

const setProperty = (el, prop, val) =>
  vendorPrefixes.forEach((prefix) => el.style.setProperty(prefix + prop, val))

const addTransitionEndListener = (el, callback) =>
  trainsitionEndEvents.forEach((event) => el.addEventListener(event, callback))

const removeTransitionEndListener = (el, callback) =>
  trainsitionEndEvents.forEach((event) => el.removeEventListener(event, callback))

export const moveElement = ({ el, easing = 'linear', duration = 200, skipAnim = false, to = {} }) => {
  const x = to.x || 0
  const y = to.y || 0

  const onComplete = () => {
    setProperty(el, 'transition', '')
    removeTransitionEndListener(el, onComplete)
  }

  if (!skipAnim) {
    setProperty(el, 'transition', `transform ${duration}ms ${easing}`)
    addTransitionEndListener(el, onComplete)
  }

  setProperty(el, 'transform', 'translate3d(' + x + 'px, ' + y + 'px, 0)')
}
