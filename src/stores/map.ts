import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
  state: () => ({
    selectedTool: 'pencil',
    selectedStyle: 'water',
  }),
  actions: {
    setTool(tool: string) {
      this.selectedTool = tool
    },
    setStyle(style: string) {
      this.selectedStyle = style
    },
  },
})
