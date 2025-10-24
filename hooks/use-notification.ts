import { create } from "zustand"

type Notification = {
    id: string
    message: string
}

type NotificationStore = {
    notifications: Notification[]
    addNotification: (message: string) => void
    removeNotification: (id: string) => void
}

export const useNotificationStore = create((set) => ({
    notifications: [],
    addNotification: (message) => {
        const id = Date.now().toString()
        set((state) => ({
            notifications: [...state.notifications, { id, message }],
        }))
        setTimeout(() => {
            set((state) => ({
                notifications: state.notifications.filter((n) => n.id !== id),
            }))
        }, 4000)
    },
    removeNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))

export function useNotification() {
    const addNotification = useNotificationStore((state) => state.addNotification)
    
    return {
        showNotification: addNotification,
    }
}