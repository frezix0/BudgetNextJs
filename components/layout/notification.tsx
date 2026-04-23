"use client"
 
import { useNotificationStore } from "@/hooks/use-notification"
import { X } from "lucide-react"
 
export default function Notification() {
  const { notifications, removeNotification } = useNotificationStore()
 
  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      pointerEvents: 'none'
    }}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            borderRadius: '12px',
            border: '1px solid var(--toast-border)',
            backgroundColor: 'var(--toast-bg)',
            backdropFilter: 'blur(10px)',
            padding: '0.75rem 1.25rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            animation: 'slidedown 0.3s ease-out',
            pointerEvents: 'auto',
            minWidth: '300px',
            justifyContent: 'space-between'
          }}
        >
          <span style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--toast-text)',
            flex: 1
          }}>
            {notification.message}
          </span>
          <button
            onClick={() => removeNotification(notification.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--toast-muted)',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--toast-text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--toast-muted)')}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}