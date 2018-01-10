export const resolution = window.App.resolution

export const getComputedWidth = (element) => {
  const style = window.getComputedStyle(element)

  return (
    parseInt(style.width, 10) +
    parseInt(style.marginLeft, 10) +
    parseInt(style.marginRight, 10)
  )
}

export const getComputedHeight = (element) => {
  const style = window.getComputedStyle(element)

  return (
    parseInt(style.height, 10) +
    parseInt(style.marginTop, 10) +
    parseInt(style.marginBottom, 10)
  )
}
