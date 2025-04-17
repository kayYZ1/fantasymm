<script setup lang="ts">
const emit = defineEmits(['open-modal'])

const handleDraw = () => {
  console.log('Pencil clicked')
  emit('open-modal', 'tile')
}

const handleDrawingOptions = () => {
  console.log('Drawing options clicked')
  emit('open-modal', 'drawing')
}

const handleText = () => {
  console.log('Text drawing clicked')
  emit('open-modal', 'text')
}

const handleSave = () => console.log('Save map activated')
</script>

<template>
  <div class="button-group">
    <button class="bar-button" @click="handleDraw" title="Draw">
      <svg class="icon" viewBox="0 0 24 24">
        <path
          d="M3 21l6-6m0 0l12-12M9 15l6-6m6-6l-1.5-1.5a2 2 0 00-2.828 0L15 3m6 0L9 15"
          stroke="#3c2f2f"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <button class="bar-button" @click="handleDrawingOptions" title="Drawing Options">
      <svg class="icon" viewBox="0 0 24 24">
        <path
          d="M7 16c0 2.21 1.79 4 4 4s4-1.79 4-4m-8-8l8 8m-8 0l8-8"
          stroke="#3c2f2f"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="12" cy="12" r="10" stroke="#3c2f2f" stroke-width="2" fill="none" />
      </svg>
    </button>
    <button class="bar-button" @click="handleText" title="Text">
      <svg class="icon" viewBox="0 0 24 24">
        <path
          d="M3 21l6-6m0 0l12-12M9 15l6-6m6-6l-1.5-1.5a2 2 0 00-2.828 0L15 3m6 0L9 15"
          stroke="#3c2f2f"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <button class="bar-button" @click="handleSave" title="Save">
      <svg class="icon" viewBox="0 0 24 24">
        <path
          d="M3 3h14l4 4v14H3V3zm4 14h10v4H7v-4zm0-8h4V3H7v6z"
          stroke="#3c2f2f"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
  gap: 0.75rem; /* Space between buttons */
}

.bar-button {
  background: var(--color-parchment);
  border: 2px solid var(--color-wood-dark);
  width: 40px; /* Fixed width for circular buttons */
  height: 40px; /* Fixed height for circular buttons */
  border-radius: 50%; /* Circular shape */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.bar-button:hover {
  background: var(--color-parchment-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
