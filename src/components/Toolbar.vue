<script setup lang="ts">
const handleDraw = () => console.log('Draw tool activated')
const handleZoom = () => console.log('Zoom tool activated')
const handleLayers = () => console.log('Layers tool activated')
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
    <button class="bar-button" @click="handleZoom" title="Zoom">
      <svg class="icon" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="6" stroke="#3c2f2f" stroke-width="2" fill="none" />
        <path d="M16 16l4 4" stroke="#3c2f2f" stroke-width="2" fill="none" stroke-linecap="round" />
        <path
          d="M11 8v6m-3-3h6"
          stroke="#3c2f2f"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
        />
      </svg>
    </button>
    <button class="bar-button" @click="handleLayers" title="Layers">
      <svg class="icon" viewBox="0 0 24 24">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
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
