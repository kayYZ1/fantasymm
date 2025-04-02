import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import mapTiles from '@/utils/map-tiles'

export const useTileStore = defineStore('tileStore', () => {
  const selectedTile = ref<string | null>(null)
  const recentTiles = ref<string[]>([])

  const selectTile = (tileName: string) => {
    selectedTile.value = tileName

    const updatedRecent = [tileName, ...recentTiles.value.filter((t) => t !== tileName)]
    recentTiles.value = updatedRecent.slice(0, 7) // Improve performance later
  }

  const clearSelectedTile = () => {
    selectedTile.value = null
  }

  const selectedTileSvg = computed(() => {
    return selectedTile.value ? mapTiles[selectedTile.value] : null
  })

  const recentTilesWithSvgs = computed(() => {
    return recentTiles.value.map((name) => ({
      name,
      svg: mapTiles[name],
    }))
  })

  return {
    selectedTile,
    recentTiles,
    selectTile,
    clearSelectedTile,
    selectedTileSvg,
    recentTilesWithSvgs,
  }
})
