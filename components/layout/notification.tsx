"use client"

import { useNotificationStore } from "@/hooks/use-notification"
import { X } from "lucide-react"

export default function Notification() {
    const { notifications, removeNotification } = useNotificationStore()

    return (
        <div className="fixed top-0 z-50 flex w-full flex-col items-center gap-2 p-4">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className="flex items-center gap-2 rounded-xl border border-placeholder bg-white/70 px-4 py-3 backdrop-blur-lg animate-slidedown dark:bg-gray-800/70"
                >
                    <span className="text-sm font-medium">{notification.message}</span>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    )
}