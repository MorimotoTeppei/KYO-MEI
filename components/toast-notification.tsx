"use client"

import { useEffect } from "react"
import { CheckCircle, X } from "lucide-react"

interface ToastNotificationProps {
  message: string
  onClose: () => void
  duration?: number
}

export function ToastNotification({ message, onClose, duration = 3000 }: ToastNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-green-400 p-4 pr-12 max-w-md">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-sm font-bold text-gray-900">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
