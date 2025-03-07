"use client"
import { signIn } from "next-auth/react"
import { IconBrandGithub } from "@tabler/icons-react"

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Welcome to CryptoFlux</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Sign in to access your dashboard</p>
        </div>
        
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          <IconBrandGithub className="w-5 h-5" />
          Continue with GitHub
        </button>
      </div>
    </div>
  )
} 