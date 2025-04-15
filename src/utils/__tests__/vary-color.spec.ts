import { describe, it, expect } from 'vitest'

import varyColor from '../vary-color'

describe('varyColor', () => {
  it('should return a valid hex color string', () => {
    const result = varyColor('#FF5733', 10)
    expect(result).toMatch(/^#[0-9A-Fa-f]{6}$/)
  })

  it('should handle hex input without # prefix', () => {
    const result = varyColor('00FF00', 5)
    expect(result).toMatch(/^#[0-9A-Fa-f]{6}$/)
  })

  it('should clamp amount between 1 and 30', () => {
    const resultLow = varyColor('#FFFFFF', 0)
    const resultHigh = varyColor('#FFFFFF', 50)
    expect(resultLow).toMatch(/^#[0-9A-Fa-f]{6}$/)
    expect(resultHigh).toMatch(/^#[0-9A-Fa-f]{6}$/)
  })

  it('should keep RGB values within 0-255 range', () => {
    const dark = varyColor('#000000', 10)
    const light = varyColor('#FFFFFF', 10)

    const parseHex = (hex: string) => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    })

    const darkRGB = parseHex(dark)
    const lightRGB = parseHex(light)

    expect(darkRGB.r).toBeGreaterThanOrEqual(0)
    expect(darkRGB.g).toBeGreaterThanOrEqual(0)
    expect(darkRGB.b).toBeGreaterThanOrEqual(0)
    expect(lightRGB.r).toBeLessThanOrEqual(255)
    expect(lightRGB.g).toBeLessThanOrEqual(255)
    expect(lightRGB.b).toBeLessThanOrEqual(255)
  })

  it('should produce varied but reasonable outputs', () => {
    const base = '#FF5733'
    const result1 = varyColor(base, 20)
    const result2 = varyColor(base, 20)

    expect(result1).not.toBe(result2)
    expect(result1).toMatch(/^#[0-9A-Fa-f]{6}$/)
    expect(result2).toMatch(/^#[0-9A-Fa-f]{6}$/)
  })
})
