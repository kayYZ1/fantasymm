import varyColor from './vary-color'

export const terrainPatterns = {
  grass: (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, baseColor: string) => {
    // Base circle
    ctx.fillStyle = varyColor(baseColor, 10)
    ctx.beginPath()
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
    ctx.fill()

    // Add blade details
    for (let i = 0; i < 8; i++) {
      ctx.strokeStyle = varyColor(baseColor, 15)
      ctx.lineWidth = Math.random() * 1 + 0.5
      const angle = Math.random() * Math.PI * 2
      const length = size * (0.4 + Math.random() * 0.3)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length)
      ctx.stroke()
    }
  },

  water: (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, baseColor: string) => {
    // Base water circle with some transparency
    ctx.fillStyle = varyColor(baseColor, 5) + 'CC' // Add some transparency
    ctx.beginPath()
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
    ctx.fill()

    // Add ripple effect
    ctx.strokeStyle = varyColor(baseColor, 10) + '88'
    ctx.lineWidth = 1
    for (let i = 0; i < 2; i++) {
      const rippleSize = ((Math.random() * 0.3 + 0.7) * size) / 2
      ctx.beginPath()
      ctx.arc(
        (Math.random() - 0.5) * size * 0.3,
        (Math.random() - 0.5) * size * 0.3,
        rippleSize,
        0,
        Math.PI * 2,
      )
      ctx.stroke()
    }
  },

  sand: (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, baseColor: string) => {
    // Base sand circle
    ctx.fillStyle = varyColor(baseColor, 7)
    ctx.beginPath()
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
    ctx.fill()

    // Add sand grain texture with dots
    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = varyColor(baseColor, 15)
      const dotX = (Math.random() - 0.5) * size
      const dotY = (Math.random() - 0.5) * size
      const dotSize = Math.random() * size * 0.1 + size * 0.02
      ctx.beginPath()
      ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2)
      ctx.fill()
    }
  },

  stone: (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, baseColor: string) => {
    // Draw irregular stone shape
    ctx.fillStyle = varyColor(baseColor, 5)
    ctx.beginPath()

    // Create an irregular polygon for the stone
    const points = 6 + Math.floor(Math.random() * 3)
    const angleStep = (Math.PI * 2) / points
    const radiusVariance = size * 0.2

    for (let i = 0; i < points; i++) {
      const angle = i * angleStep
      const radius = size / 2 - Math.random() * radiusVariance
      const px = Math.cos(angle) * radius
      const py = Math.sin(angle) * radius

      if (i === 0) {
        ctx.moveTo(px, py)
      } else {
        ctx.lineTo(px, py)
      }
    }

    ctx.closePath()
    ctx.fill()

    // Add crack details
    ctx.strokeStyle = varyColor(baseColor, -10) // Darker color for cracks
    ctx.lineWidth = 0.5
    ctx.beginPath()
    const crackX = (Math.random() - 0.5) * size * 0.5
    const crackY = (Math.random() - 0.5) * size * 0.5
    ctx.moveTo(crackX, crackY)
    ctx.lineTo(
      crackX + (Math.random() - 0.5) * size * 0.7,
      crackY + (Math.random() - 0.5) * size * 0.7,
    )
    ctx.stroke()
  },

  dirt: (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, baseColor: string) => {
    // Base dirt circle
    ctx.fillStyle = varyColor(baseColor, 8)
    ctx.beginPath()
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
    ctx.fill()

    // Add soil texture with small clumps
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = varyColor(baseColor, 12)
      const clumpX = (Math.random() - 0.5) * size * 0.8
      const clumpY = (Math.random() - 0.5) * size * 0.8
      const clumpSize = Math.random() * size * 0.25 + size * 0.05

      ctx.beginPath()
      ctx.arc(clumpX, clumpY, clumpSize, 0, Math.PI * 2)
      ctx.fill()
    }
  },
}

export const getTerrainType = (tileKey: string) => {
  if (tileKey.includes('grass')) return 'grass'
  if (tileKey.includes('water')) return 'water'
  if (tileKey.includes('sand')) return 'sand'
  if (tileKey.includes('stone')) return 'stone'
  if (tileKey.includes('dirt')) return 'dirt'
  return 'grass' // Default
}
