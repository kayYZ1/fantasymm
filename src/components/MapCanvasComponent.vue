<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useTileStore } from '@/stores/tile'
import { useDrawingOptionsStore } from '@/stores/drawing-options'

import tileColors from '@/utils/map-tiles'
import { getTerrainType, terrainPatterns } from '@/utils/terrain-patterns'

const tileStore = useTileStore()
const drawingOptions = useDrawingOptionsStore()

const mapCanvas = ref<HTMLCanvasElement | null>(null)
const isPainting = ref(false)
const cachedTileColor = ref<string>('')

onMounted(() => {
  if (mapCanvas.value) {
    const canvas = mapCanvas.value
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
})

const cacheSelectedTileColor = () => {
  const selectedKey = tileStore.selectedTileKey
  if (!selectedKey || !tileColors[selectedKey]) {
    cachedTileColor.value = ''
    return
  }
  cachedTileColor.value = tileColors[selectedKey]
}

const paintBrushStroke = (mouseX: number, mouseY: number) => {
  if (!mapCanvas.value || !cachedTileColor.value) return

  const canvas = mapCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }
  const terrainType = getTerrainType(tileStore.selectedTileKey as string)
  const baseColor = tileColors[tileStore.selectedTileKey as string]

  for (let i = 0; i < drawingOptions.brushDensity; i++) {
    const offsetX = (Math.random() - 0.5) * 2 * drawingOptions.jitterAmount
    const offsetY = (0.5 - Math.random()) * 2 * drawingOptions.jitterAmount
    const drawX = mouseX + offsetX
    const drawY = mouseY + offsetY

    ctx.save()
    ctx.translate(drawX, drawY)
    if (drawingOptions.randomizeRotation) {
      ctx.rotate(Math.random() * Math.PI * 2)
    }

    terrainPatterns[terrainType](ctx, 0, 0, drawingOptions.stampSize, baseColor)

    ctx.restore()
  }
}

watch(() => tileStore.selectedTileKey, cacheSelectedTileColor, { immediate: true })

const getMousePos = (event: MouseEvent): { x: number; y: number } | null => {
  if (!mapCanvas.value) return null
  const rect = mapCanvas.value.getBoundingClientRect()
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

const startPainting = (event: MouseEvent) => {
  if (!cachedTileColor.value) {
    return
  }
  isPainting.value = true
  const pos = getMousePos(event)
  if (pos) {
    paintBrushStroke(pos.x, pos.y)
  }
}

const paintWhileMoving = (event: MouseEvent) => {
  if (!isPainting.value) {
    return
  }

  const pos = getMousePos(event)
  if (pos) {
    paintBrushStroke(pos.x, pos.y)
  }
}

const stopPainting = () => {
  isPainting.value = false
}
</script>

<template>
  <section class="map-area">
    <canvas
      ref="mapCanvas"
      class="map-canvas"
      @mousedown="startPainting"
      @mousemove="paintWhileMoving"
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
