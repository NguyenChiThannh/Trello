import { create } from 'zustand'

const useDetailCardStore = create((set) => ({
  openDetailCard: false,
  selectedCard: null,
  setOpenDetailCard: (state) => set({ openDetailCard: state }),
  updateCard: (card) => set({ selectedCard: card }),
}))

export default useDetailCardStore