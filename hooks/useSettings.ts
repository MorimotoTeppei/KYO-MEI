"use client"

import { useState, useEffect } from "react"
import { UserSettings, DEFAULT_SETTINGS } from "@/types/settings"

const SETTINGS_STORAGE_KEY = "kyo-mei-settings"

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS)
  const [isLoaded, setIsLoaded] = useState(false)

  // ローカルストレージから設定を読み込む
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY)
      if (stored) {
        const parsedSettings = JSON.parse(stored)
        setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings })
      }
    } catch (error) {
      console.error("Failed to load settings:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // 設定をローカルストレージに保存
  const saveSettings = (newSettings: UserSettings) => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings))
      setSettings(newSettings)
    } catch (error) {
      console.error("Failed to save settings:", error)
    }
  }

  // 設定を更新
  const updateSettings = (updates: Partial<UserSettings>) => {
    const newSettings = { ...settings, ...updates }
    saveSettings(newSettings)
  }

  // 設定をリセット
  const resetSettings = () => {
    saveSettings(DEFAULT_SETTINGS)
  }

  return {
    settings,
    updateSettings,
    resetSettings,
    isLoaded,
  }
}
