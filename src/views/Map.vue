<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const mapContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (mapContainer.value) {
    console.log('Map container ready for initialization')
  }
})

const handleDraw = () => console.log('Draw tool activated')
const handleZoom = () => console.log('Zoom tool activated')
const handleLayers = () => console.log('Layers tool activated')
const handleSave = () => console.log('Save map activated')

const turnBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="map-container">
    <p class="turn-back" @click="turnBack">Turn back</p>
    <section ref="mapContainer" class="map-area">
      <div class="map-placeholder">
        <p>Thy Realm Awaits</p>
      </div>
    </section>

    <footer class="bottom-bar">
      <div class="button-group">
        <button class="bar-button" @click="handleDraw" title="Draw">
          <svg class="icon" viewBox="0 0 24 24">
            <!-- Quill icon -->
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
            <!-- Magnifying glass icon -->
            <circle cx="11" cy="11" r="6" stroke="#3c2f2f" stroke-width="2" fill="none" />
            <path
              d="M16 16l4 4"
              stroke="#3c2f2f"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
            />
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
            <!-- Layers icon -->
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
            <!-- Save icon (floppy disk) -->
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
    </footer>
  </div>
</template>

<style scoped>
.map-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: inherit;
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
  justify-content: flex-end;
  border-radius: var(--border-radius);
  padding: 0 1rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
}

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
