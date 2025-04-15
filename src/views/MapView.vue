<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Toolbar from '@/components/ToolbarComponent.vue'
import TileModal from '@/components/TileModalComponent.vue'
import DrawingOptionsModal from '@/components/DrawingOptionsModalComponent.vue'
import RecentTilesComponent from '@/components/RecentTilesComponent.vue'
import MapCanvasComponent from '@/components/MapCanvasComponent.vue'

const router = useRouter()
const activeModal = ref<string | null>(null)

const turnBack = () => router.push('/')

const openModal = (modalType: string) => {
  activeModal.value = modalType
}

const closeModal = () => {
  activeModal.value = null
}
</script>

<template>
  <div class="map-container">
    <p class="turn-back" @click="turnBack">Turn back</p>
    <MapCanvasComponent />
    <footer class="bottom-bar">
      <RecentTilesComponent />
      <Toolbar @open-modal="openModal" />
    </footer>
    <TileModal :is-open="activeModal === 'tile'" @close="closeModal" />
    <DrawingOptionsModal :is-open="activeModal === 'drawing'" @close="closeModal" />
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
  cursor: crosshair;
}

.turn-back {
  padding: 0.5rem 0 0.5rem 0;
  cursor: pointer;
}

.turn-back:hover {
  text-decoration: underline;
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

@media (max-width: 768px) {
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
