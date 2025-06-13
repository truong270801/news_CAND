import { create } from 'zustand'

const useStore = create((set) => ({
  // Sidebar state
  collapsed: false,
  toggleSidebar: () => set((state) => ({ collapsed: !state.collapsed })),

  // Search state
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Chapter selection state
  selectedChapter: null,
  setSelectedChapter: (chapter) => set({ selectedChapter: chapter }),
}))

export default useStore 