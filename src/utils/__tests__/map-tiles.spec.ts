import { describe, it, expect } from 'vitest'

import tileColors from '../map-tiles'

describe('Tile Colors', () => {
  it('should have all required tile types', () => {
    const requiredTiles = [
      'grass_standard_1',
      'grass_tufted_2',
      'grass_light_3',
      'grass_olive_4',
      'sand_rippled_1',
      'sand_pebbly_2',
      'sand_light_3',
      'sand_dark_4',
      'water_shallow_waves_1',
      'water_shallow_ripple_2',
      'water_shallow_light_3',
      'water_deep_calm_1',
      'water_deep_swell_2',
      'water_deep_dark_3',
      'stone_grey_crack_1',
      'stone_grey_pebble_2',
      'stone_slate_moss_3',
      'stone_light_detail_4',
      'dirt_brown_pebble_1',
      'dirt_brown_crack_2',
      'dirt_light_grass_3',
      'dirt_dark_stone_4',
    ]

    requiredTiles.forEach((tile) => {
      expect(tileColors[tile]).toBeDefined()
    })
  })

  it('should have valid hex color values', () => {
    Object.values(tileColors).forEach((color) => {
      expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/)
    })
  })
})
