export const getComputedWidth = (element) => {
  const style = window.getComputedStyle(element)

  return (
    Number.parseInt(style.width) +
    Number.parseInt(style.marginLeft) +
    Number.parseInt(style.marginRight)
  )
}

export const getComputedHeight = (element) => {
  const style = window.getComputedStyle(element)

  return (
    Number.parseInt(style.height) +
    Number.parseInt(style.marginTop) +
    Number.parseInt(style.marginBottom)
  )
}
