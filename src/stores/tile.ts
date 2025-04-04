import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import tileSvgs from '@/utils/map-tiles'

export const useTileStore = defineStore('tileStore', () => {
  const selectedTileKey = ref<string | null>(null)
  const recentTileKeys = ref<string[]>([])

  const selectTile = (tileKey: string) => {
    if (tileSvgs[tileKey]) {
      selectedTileKey.value = tileKey

      const updatedRecent = [tileKey, ...recentTileKeys.value.filter((key) => key !== tileKey)]
      recentTileKeys.value = updatedRecent.slice(0, 7)
    } else {
      console.warn(`Tile key "${tileKey}" not found in tileSvgVariationsData.`)
      selectedTileKey.value = null
    }
  }

  const clearSelectedTile = () => {
    selectedTileKey.value = null
  }

  const selectedTileSvg = computed<string | null>(() => {
    return selectedTileKey.value ? tileSvgs[selectedTileKey.value] || null : null
  })

  const recentTilesWithPreview = computed(() => {
    return recentTileKeys.value.map((key) => ({
      name: key,
      svgPreview: tileSvgs[key]?.[0] ?? null,
    }))
  })

  return {
    selectedTileKey, // The key/name of the currently selected tile type (e.g., 'lushGrass')
    recentTileKeys, // Array of recently used tile keys
    selectTile, // Action to select a tile by key
    clearSelectedTile, // Action to clear selection
    selectedTileSvg, // Computed array of SVG strings for the selected type
    recentTilesWithPreview, // Computed array of recent tiles with { name, svgPreview }
  }
})
