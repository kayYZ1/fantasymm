<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Toolbar from '@/components/ToolbarComponent.vue'
import TileModal from '@/components/TileModalComponent.vue'
import RecentTilesComponent from '@/components/RecentTilesComponent.vue'

const router = useRouter()

const mapCanvas = ref<HTMLCanvasElement | null>(null)
const showModal = ref(false)

onMounted(() => {
  if (mapCanvas.value) {
    const canvas = mapCanvas.value
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
})

const turnBack = () => router.push('/')

const openTileModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <div class="map-container">
    <p class="turn-back" @click="turnBack">Turn back</p>
    <section class="map-area">
      <canvas ref="mapCanvas" class="map-canvas"></canvas>
    </section>
    <footer class="bottom-bar">
      <RecentTilesComponent />
      <Toolbar @open-modal="openTileModal" />
    </footer>
    <TileModal :is-open="showModal" @close="closeModal" />
  </div>
</template>

<style scoped>
.map-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: inherit;
}

.map-canvas {
  width: 100%;
  height: 100%;
}

.turn-back {
  padding: 0.5rem 0 0.5rem 0;
  cursor: pointer;
}

.turn-back:hover {
  text-decoration: underline;
}

.map-area {
  flex: 1;
  background: rgba(255, 245, 230, 0.9);
  border: 2px solid var(--color-wood);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  position: relative;
  overflow: auto;
}

.map-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-sketch {
  width: 80%;
  max-width: 600px;
  height: auto;
  border: 1px solid var(--color-wood-dark);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.bottom-bar {
  background: var(--color-wood);
  border-top: 2px solid var(--color-wood-dark);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--border-radius);
  padding: 0 1rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
}

/* Custom scrollbar for the map area */
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

/* Firefox scrollbar */
.map-area {
  scrollbar-width: thin;
  scrollbar-color: var(--color-parchment) var(--color-wood);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .map-sketch {
    width: 90%;
  }

  .bottom-bar {
    height: 50px;
    padding: 0 0.5rem;
  }

  .bar-button {
    width: 36px;
    height: 36px;
  }

  .icon {
    width: 18px;
    height: 18px;
  }

  .button-group {
    gap: 0.5rem;
  }
}
</style>
