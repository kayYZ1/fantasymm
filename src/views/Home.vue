<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const startMapMaking = () => {
  router.push('/map')
}
</script>

<template>
  <div class="welcome-container">
    <header class="parchment-header">
      <h1 class="title">Welcome to Fantasy Map Maker</h1>
      <p class="subtitle">Craft Thy Legendary Maps For Your Novels and so on</p>
    </header>

    <main class="content">
      <div class="scroll-text">
        <p>
          Greetings, noble mapmakers! Venture forth into the ancient art of cartography, where
          kingdoms rise and fall upon the parchment of thy creation.
        </p>
        <p>
          With quill and ink, shape mystical lands filled with dragons, castles, and forgotten
          realms.
        </p>
      </div>

      <button class="medieval-button" @click="startMapMaking">Begin Thy Quest</button>
    </main>

    <footer class="footer">
      <p>Scribed by github.com/kayYZ1 • Anno Domini MMXXV</p>
    </footer>
  </div>
</template>

<style scoped>
.welcome-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: inherit;
}

/* Add the mountain drawing in the lower part */
.welcome-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: url('@/assets/images/mountains.png') repeat;
  opacity: 0.1;
  pointer-events: none;
}

.parchment-header {
  background: rgba(255, 245, 230, 0.9);
  border: 2px solid #8b5a2b;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.title {
  font-family: 'Cinzel', serif;
  font-size: 2.5rem;
  color: #3c2f2f;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-family: 'MedievalSharp', cursive;
  font-size: 1.2rem;
  color: #6b4e31;
  margin: 0.5rem 0 0;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.scroll-text {
  background: rgba(255, 245, 230, 0.9);
  border: 1px solid #8b5a2b;
  padding: 1.5rem;
  margin-bottom: 2rem;
  font-family: 'MedievalSharp', cursive;
  color: #3c2f2f;
  line-height: 1.6;
  position: relative;
}

.scroll-text::before,
.scroll-text::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: #8b5a2b;
  border-radius: 50%;
}

.scroll-text::before {
  top: -10px;
  left: -10px;
}

.scroll-text::after {
  bottom: -10px;
  right: -10px;
}

.medieval-button {
  background: #6b4e31;
  color: #f4e8c1;
  padding: 1rem 2rem;
  border: 2px solid #3c2f2f;
  border-radius: 4px;
  font-family: 'Cinzel', serif;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.medieval-button:hover {
  background: #8b5a2b;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.footer {
  text-align: center;
  font-family: 'MedievalSharp', cursive;
  color: #6b4e31;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .scroll-text {
    padding: 1rem;
  }

  .medieval-button {
    padding: 0.8rem 1.5rem;
  }

  .welcome-container::after {
    height: 30%; /* Slightly smaller on mobile */
  }
}
</style>
