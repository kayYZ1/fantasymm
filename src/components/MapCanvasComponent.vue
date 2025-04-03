<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import { useTileStore } from '@/stores/tile'

const tileStore = useTileStore()

const mapCanvas = ref<HTMLCanvasElement | null>(null)
const isDragging = ref(false)
const cachedCanvasMap = ref<HTMLImageElement | null>(null)

const tileSize = 16

onMounted(() => {
  if (mapCanvas.value) {
    const canvas = mapCanvas.value
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
})

const cacheSelectedTile = () => {
  if (!tileStore.selectedTileSvg) {
    return
  }

  const svgString = tileStore.selectedTileSvg
  const img = new Image()
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(svgBlob)

  img.onload = () => {
    cachedCanvasMap.value = img
    URL.revokeObjectURL(url)
  }
  img.src = url
}

const paintTileAt = (x: number, y: number) => {
  if (!mapCanvas.value || !cachedCanvasMap.value) {
    return
  }

  const canvas = mapCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  const gridX = Math.floor(x / tileSize) * tileSize
  const gridY = Math.floor(y / tileSize) * tileSize

  ctx.drawImage(cachedCanvasMap.value, gridX, gridY, tileSize, tileSize)
}

watch(
  () => {
    return tileStore.selectedTileSvg
  },
  () => {
    cacheSelectedTile()
  },
  { immediate: true },
)

const startPainting = (event: MouseEvent) => {
  isDragging.value = true
  const rect = mapCanvas.value!.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  paintTileAt(x, y)
}

const paintWhileDragging = (event: MouseEvent) => {
  if (!isDragging.value) {
    return
  }

  const rect = mapCanvas.value!.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  paintTileAt(x, y)
}

const stopPainting = () => {
  isDragging.value = false
}
</script>

<template>
  <section class="map-area">
    <canvas
      ref="mapCanvas"
      class="map-canvas"
      @mousedown="startPainting"
      @mousemove="paintWhileDragging"
      @mouseup="stopPainting"
      @mouseleave="stopPainting"
    />
  </section>
</template>

<style scoped>
.map-area {
  flex: 1;
  background: rgba(255, 245, 230, 0.9);
  border: 2px solid var(--color-wood);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  position: relative;
  overflow: auto;
}

.map-canvas {
  width: 100%;
  height: 100%;
  cursor: crosshair;
}

.map-area::-webkit-scrollbar {
  width: 12px;
}

.map-area::-webkit-scrollbar-track {
  background: var(--color-wood);
  border-left: 2px solid var(--color-wood-dark);
  border-right: 2px solid var(--color-wood-dark);
}

.map-area::-webkit-scrollbar-thumb {
  background: var(--color-parchment);
  border: 2px solid var(--color-wood-dark);
  border-radius: 6px;
}

.map-area::-webkit-scrollbar-thumb:hover {
  background: var(--color-parchment-dark);
}

.map-area {
  scrollbar-width: thin;
  scrollbar-color: var(--color-parchment) var(--color-wood);
}
</style>
