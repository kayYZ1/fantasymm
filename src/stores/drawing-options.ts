import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrawingOptionsStore = defineStore('drawingOptions', () => {
  const brushDensity = ref(5)
  const stampSize = ref(16)
  const randomizeRotation = ref(true)
  const jitterAmount = ref(8)

  function setBrushDensity(val: number) {
    brushDensity.value = val
  }
  function setStampSize(val: number) {
    stampSize.value = val
  }
  function setRandomizeRotation(val: boolean) {
    randomizeRotation.value = val
  }
  function setJitterAmount(val: number) {
    jitterAmount.value = val
  }

  return {
    brushDensity,
    stampSize,
    randomizeRotation,
    jitterAmount,
    setBrushDensity,
    setStampSize,
    setRandomizeRotation,
    setJitterAmount,
  }
})
