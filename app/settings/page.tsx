'use client';

import { useState } from 'react'
import { useSession } from "next-auth/react"
import Image from "next/image"
import {
  IconMoon,
  IconSun,
  IconBell,
  IconLock,
  IconUser,
  IconMail,
  IconPhone,
  IconLanguage,
  IconCurrencyDollar,
  IconDeviceMobile,
  IconShieldLock,
  IconAlertCircle,
  IconBrowserCheck
} from '@tabler/icons-react'

export default function SettingsPage() {
  const { data: session } = useSession()
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    trades: true,
    security: true,
    marketing: false
  })
  const [currency, setCurrency] = useState('USD')
  const [language, setLanguage] = useState('English')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  return (
    <div className="flex-1 p-3 sm:p-6 bg-gray-50 dark:bg-neutral-900 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Profile Settings */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile picture"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                <IconUser className="h-8 w-8 text-neutral-500 dark:text-neutral-400" />
              )}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white">Profile Settings</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Update your personal information</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={session?.user?.name || ""}
                placeholder="John Doe"
                className="w-full bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg px-4 py-2.5 text-neutral-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={session?.user?.email || ""}
                readOnly
                className="w-full bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg px-4 py-2.5 text-neutral-900 dark:text-white cursor-not-allowed"
                title="This email cannot be changed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value="+1 (555) 123-4567"
                readOnly
                className="w-full bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg px-4 py-2.5 text-neutral-900 dark:text-white cursor-not-allowed"
                title="This phone number cannot be changed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Country
              </label>
              <select className="w-full bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg px-4 py-3 text-neutral-900 dark:text-white">
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Security Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
              <div className="flex items-center gap-3">
                <IconLock className="text-neutral-700 dark:text-neutral-200" />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Change Password</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Update your password regularly</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                Update
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
              <div className="flex items-center gap-3">
                <IconShieldLock className="text-neutral-700 dark:text-neutral-200" />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Add an extra layer of security</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
              <div className="flex items-center gap-3">
                <IconBrowserCheck className="text-neutral-700 dark:text-neutral-200" />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Active Sessions</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Manage your active sessions</p>
                </div>
              </div>
              <button className="px-4 py-2 text-neutral-700 dark:text-neutral-200 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors">
                View All
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <IconMoon className="text-neutral-700 dark:text-neutral-200" />
                ) : (
                  <IconSun className="text-neutral-700 dark:text-neutral-200" />
                )}
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Dark Mode</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Switch between light and dark theme</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
              <div className="flex items-center gap-3">
                <IconLanguage className="text-neutral-700 dark:text-neutral-200" />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Language</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Select your preferred language</p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-600 rounded-lg px-4 py-2 text-sm text-neutral-900 dark:text-white"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
              <div className="flex items-center gap-3">
                <IconCurrencyDollar className="text-neutral-700 dark:text-neutral-200" />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Currency</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Choose your preferred currency</p>
                </div>
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-600 rounded-lg px-4 py-2 text-sm text-neutral-900 dark:text-white"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>JPY</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
              <div className="flex items-center gap-3">
                <IconMail className="text-neutral-700 dark:text-neutral-200" />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Email Notifications</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Receive email updates</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => {
                    if (notifications.push && notifications.trades) {
                      setNotifications({ email: !notifications.email, push: false, trades: false, security: notifications.security, marketing: notifications.marketing });
                    } else {
                      setNotifications({ ...notifications, email: !notifications.email });
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
              <div className="flex items-center gap-3">
                <IconDeviceMobile className="text-neutral-700 dark:text-neutral-200" />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Push Notifications</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Get notified on your device</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={() => {
                    if (notifications.email && notifications.trades) {
                      setNotifications({ email: false, push: !notifications.push, trades: false, security: notifications.security, marketing: notifications.marketing });
                    } else {
                      setNotifications({ ...notifications, push: !notifications.push });
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
              <div className="flex items-center gap-3">
                <IconAlertCircle className="text-neutral-700 dark:text-neutral-200" />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Price Alerts</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Get notified about price changes</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.trades}
                  onChange={() => {
                    if (notifications.email && notifications.push) {
                      setNotifications({ email: false, push: false, trades: !notifications.trades, security: notifications.security, marketing: notifications.marketing });
                    } else {
                      setNotifications({ ...notifications, trades: !notifications.trades });
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
} 