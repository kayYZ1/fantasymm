<script setup lang="ts">
import { ref, computed } from 'vue'

import mapTiles from '@/utils/map-tiles'
import { useTileStore } from '@/stores/tile'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const tileStore = useTileStore()
const searchQuery = ref('')

const filteredTiles = computed(() => {
  if (!searchQuery.value) {
    return mapTiles
  }
  const query = searchQuery.value.toLowerCase()
  return Object.fromEntries(
    Object.entries(mapTiles).filter(([name]) => name.toLowerCase().includes(query)),
  )
})

const selectTile = (tileName: string) => {
  tileStore.selectTile(tileName)
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
      <h3>Choose a Tile</h3>
      <input v-model="searchQuery" type="text" placeholder="Search tiles..." class="search-input" />
      <div class="tile-grid-wrapper">
        <div class="tile-grid">
          <div
            v-for="(svg, name) in filteredTiles"
            :key="name"
            class="tile-icon"
            @click="selectTile(name as string)"
          >
            <span class="tile-image" v-html="svg"></span>
            <p class="tile-text">{{ name }}</p>
          </div>
        </div>
      </div>
      <button class="close-button" @click="emit('close')">Close</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: var(--color-parchment);
  border: 2px solid var(--color-wood);
  padding: 2rem;
  border-radius: var(--border-radius);
  width: 1000px;
  height: 600px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Space between elements */
}

.search-input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid var(--color-wood);
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 400px; /* Limit width for aesthetics */
  align-self: center;
}

.tile-grid-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 0 10px;
}

.tile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.tile-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
  padding: 5px;
}

.tile-icon:hover {
  transform: scale(1.1);
}

.tile-image {
  margin-right: 10px;
}

.tile-image svg {
  width: 16px; /* Enforce SVG size */
  height: 16px;
}

.tile-text {
  margin: 0;
  font-size: 0.9rem;
  text-align: left;
}

.close-button {
  background: var(--color-wood);
  color: var(--color-parchment);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
}
.close-button:hover {
  background: var(--color-wood-dark);
}
</style>
