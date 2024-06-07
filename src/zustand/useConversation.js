import { create } from 'zustand'

const useConversation = create((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
}))

export default useConversation