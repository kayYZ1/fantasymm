import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import tileColors from '@/utils/map-tiles'

export const useTileStore = defineStore('tileStore', () => {
  const selectedTileKey = ref<string | null>(null)
  const recentTileKeys = ref<string[]>([])

  const selectTile = (tileKey: string) => {
    if (tileColors[tileKey]) {
      selectedTileKey.value = tileKey
      const updatedRecent = [tileKey, ...recentTileKeys.value.filter((key) => key !== tileKey)]
      recentTileKeys.value = updatedRecent.slice(0, 7)
    } else {
      console.warn(`Tile key "${tileKey}" not found in tileColors.`)
      selectedTileKey.value = null
    }
  }

  const clearSelectedTile = () => {
    selectedTileKey.value = null
  }

  const selectedTileColor = computed<string | null>(() => {
    return selectedTileKey.value ? tileColors[selectedTileKey.value] || null : null
  })

  const getTerrainType = (tileKey: string): string => {
    if (tileKey.includes('grass')) return 'grass'
    if (tileKey.includes('water')) return 'water'
    if (tileKey.includes('sand')) return 'sand'
    if (tileKey.includes('stone')) return 'stone'
    if (tileKey.includes('dirt')) return 'dirt'
    return 'unknown'
  }

  const selectedTerrainType = computed<string | null>(() => {
    return selectedTileKey.value ? getTerrainType(selectedTileKey.value) : null
  })

  const recentTilesWithPreview = computed(() => {
    return recentTileKeys.value.map((key) => ({
      name: key,
      color: tileColors[key] || null,
      terrainType: getTerrainType(key),
    }))
  })

  return {
    selectedTileKey,
    recentTileKeys,
    selectTile,
    clearSelectedTile,
    selectedTileColor,
    selectedTerrainType,
    recentTilesWithPreview,
    getTerrainType,
  }
})
