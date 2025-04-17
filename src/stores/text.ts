import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTextStore = defineStore('textStore', () => {
  //Text draw options
  const text = ref('')
  const textSize = ref(16)
  const textColor = ref('#000')

  function setText(val: string) {
    text.value = val
  }
  function setTextSize(val: number) {
    textSize.value = val
  }
  function setTextColor(val: string) {
    textColor.value = val
  }

  return {
    text,
    textSize,
    textColor,
    setText,
    setTextSize,
    setTextColor,
  }
})
