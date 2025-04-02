<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useTileStore } from '@/stores/tile'

const tileStore = useTileStore()

const mapCanvas = ref<HTMLCanvasElement | null>(null)
const tileSize = 32

onMounted(() => {
  if (mapCanvas.value) {
    const canvas = mapCanvas.value
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
})

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

const paintTile = (event: MouseEvent) => {
  if (!mapCanvas.value || !tileStore.selectedTileSvg) {
    return
  }

  const canvas = mapCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const gridX = Math.floor(x / tileSize) * tileSize
  const gridY = Math.floor(y / tileSize) * tileSize

  const svgString = tileStore.selectedTileSvg
  const img = new Image()
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(svgBlob)

  img.onload = () => {
    ctx.drawImage(img, gridX, gridY, tileSize, tileSize)
    URL.revokeObjectURL(url) // Clean up
  }
  img.src = url
}
</script>

<template>
  <section class="map-area">
    <canvas ref="mapCanvas" class="map-canvas" @click="paintTile" />
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
