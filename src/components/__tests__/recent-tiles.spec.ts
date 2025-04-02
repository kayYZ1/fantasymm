import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import RecentTilesComponent from '../RecentTilesComponent.vue'
import { useTileStore } from '@/stores/tile'

vi.mock('@/stores/tile', () => ({
  useTileStore: vi.fn(() => ({
    selectTile: vi.fn(),
    recentTiles: [],
    recentTilesWithSvgs: [],
  })),
}))

describe('RecentTiles component tests', () => {
  let tileStoreMock: {
    selectTile: ReturnType<typeof vi.fn>
    recentTiles: string[]
    recentTilesWithSvgs: { name: string; svg: string }[]
  }

  beforeEach(() => {
    setActivePinia(createPinia())

    tileStoreMock = {
      selectTile: vi.fn(),
      recentTiles: [],
      recentTilesWithSvgs: [],
    }

    vi.mocked(useTileStore).mockReturnValue(tileStoreMock as any)
  })

  it('displays message when no recent tiles exist', () => {
    tileStoreMock.recentTiles = []
    tileStoreMock.recentTilesWithSvgs = []

    const wrapper = mount(RecentTilesComponent)

    expect(wrapper.find('.no-tiles').exists()).toBe(true)
    expect(wrapper.find('.no-tiles').text()).toBe('No recent tiles')
    expect(wrapper.findAll('.tile-icon').length).toBe(0)
  })

  it('renders recent tiles correctly', () => {
    tileStoreMock.recentTiles = ['grass', 'water']
    tileStoreMock.recentTilesWithSvgs = [
      { name: 'grass', svg: '<svg>grass svg</svg>' },
      { name: 'water', svg: '<svg>water svg</svg>' },
    ]

    const wrapper = mount(RecentTilesComponent)

    expect(wrapper.find('.no-tiles').exists()).toBe(false)

    const tileIcons = wrapper.findAll('.tile-icon')
    expect(tileIcons.length).toBe(2)

    const svgContainers = wrapper.findAll('.svg-container')
    expect(svgContainers[0].html()).toContain('<svg>grass svg</svg>')
    expect(svgContainers[1].html()).toContain('<svg>water svg</svg>')
  })

  it('calls selectTile when a tile is clicked', async () => {
    tileStoreMock.recentTiles = ['grass']
    tileStoreMock.recentTilesWithSvgs = [{ name: 'grass', svg: '<svg>grass svg</svg>' }]

    const wrapper = mount(RecentTilesComponent)
    const tileIcon = wrapper.find('.tile-icon')

    await tileIcon.trigger('click')

    expect(tileStoreMock.selectTile).toHaveBeenCalledTimes(1)
    expect(tileStoreMock.selectTile).toHaveBeenCalledWith('grass')
  })
})
