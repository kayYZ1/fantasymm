<script setup lang="ts">
import { useTextStore } from '@/stores/text'
import { storeToRefs } from 'pinia'

defineProps<{ isOpen: boolean }>()

const emit = defineEmits(['close'])

const textStore = useTextStore()
const { text, textSize, textColor } = storeToRefs(textStore)
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
      <h3>Text</h3>
      <div class="text-options">
        <label>
          <span>Text</span>
          <input type="text" v-model="text" />
        </label>
        <label>
          <span>Font Size</span>
          <input type="range" min="8" max="64" v-model="textSize" />
          <span class="value">{{ textSize }}</span>
        </label>
        <label>
          <span>Color</span>
          <input type="color" v-model="textColor" />
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
.text-options {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
}
.text-options label {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  width: 100%;
  justify-content: space-between;
}
.text-options input[type='range'] {
  flex: 1;
  margin: 0 1rem;
}
.text-options input[type='text'] {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--color-wood);
  border-radius: 4px;
  background: transparent;
  color: var(--color-wood-dark);
}
.text-options .value {
  min-width: 2ch;
  text-align: right;
  font-family: monospace;
  color: #7c5c3b;
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
