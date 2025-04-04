const varyColor = (hex: string, amount: number): string => {
  hex = hex.replace('#', '')
  amount = Math.max(1, Math.min(30, amount))
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)

  r = Math.max(0, Math.min(255, r + Math.floor(Math.random() * amount * 2 - amount)))
  g = Math.max(0, Math.min(255, g + Math.floor(Math.random() * amount * 2 - amount)))
  b = Math.max(0, Math.min(255, b + Math.floor(Math.random() * amount * 2 - amount)))

  const rr = r.toString(16).padStart(2, '0')
  const gg = g.toString(16).padStart(2, '0')
  const bb = b.toString(16).padStart(2, '0')

  return `#${rr}${gg}${bb}`
}

export default varyColor
