<script setup lang="ts">
import { useDrawingOptionsStore } from '@/stores/drawing-options'
import { storeToRefs } from 'pinia'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const drawingOptions = useDrawingOptionsStore()
const { brushDensity, stampSize, randomizeRotation, jitterAmount } = storeToRefs(drawingOptions)
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
      <h3>Drawing Options</h3>
      <div class="drawing-options">
        <label>
          <span>Brush Density</span>
          <input type="range" min="1" max="20" v-model="brushDensity" />
          <span class="value">{{ brushDensity }}</span>
        </label>
        <label>
          <span>Stamp Size</span>
          <input type="range" min="1" max="64" v-model="stampSize" />
          <span class="value">{{ stampSize }}</span>
        </label>
        <label class="checkbox-label">
          <span>Randomize Rotation</span>
          <input type="checkbox" v-model="randomizeRotation" />
        </label>
        <label>
          <span>Jitter Amount</span>
          <input type="range" min="0" max="32" v-model="jitterAmount" />
          <span class="value">{{ jitterAmount }}</span>
        </label>
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
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: var(--color-parchment, #fff8e1);
  border: 2px solid var(--color-wood, #a67c52);
  padding: 2rem 3rem;
  border-radius: 12px;
  min-width: 350px;
  max-width: 95vw;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.drawing-options {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;
  width: 100%;
}
.drawing-options label {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  width: 100%;
  justify-content: space-between;
}
.drawing-options input[type='range'] {
  flex: 1;
  margin: 0 1rem;
}
.drawing-options .value {
  min-width: 2ch;
  text-align: right;
  font-family: monospace;
  color: #7c5c3b;
}
.checkbox-label {
  gap: 0.5rem;
}
.close-button {
  background: var(--color-wood, #a67c52);
  color: var(--color-parchment, #fff8e1);
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background 0.2s;
}
.close-button:hover {
  background: var(--color-wood-dark, #8b5c2c);
}
</style>
