<!-- components/RecentTiles.vue -->
<script setup lang="ts">
import { useTileStore } from '@/stores/tile'

const tileStore = useTileStore()

const selectTile = (tileName: string) => {
  tileStore.selectTile(tileName)
}
</script>

<template>
  <div class="recent-tiles">
    <div
      v-for="tile in tileStore.recentTilesWithPreview"
      :key="tile.name"
      class="tile-icon"
      @click="selectTile(tile.name)"
    >
      <span class="svg-container" :style="{ backgroundColor: tile.color as string }"></span>
    </div>
    <div v-if="!tileStore.recentTilesWithPreview.length" class="no-tiles">No recent tiles</div>
  </div>
</template>

<style scoped>
.recent-tiles {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 10px 0;
}

.tile-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  cursor: pointer;
  overflow: hidden;
}

.svg-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.svg-container :deep(svg) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.no-tiles {
  color: #fff;
  text-align: center;
  width: 100%;
}
</style>
