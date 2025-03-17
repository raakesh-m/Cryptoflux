"use client"
import { signIn } from "next-auth/react"
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Welcome to CryptoFlux</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Sign in to access all features or continue as guest</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            <IconBrandGithub className="w-5 h-5" />
            Continue with GitHub
          </button>

          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 text-neutral-900 dark:text-white py-2 px-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          >
            <IconBrandGoogle className="w-5 h-5 text-[#4285F4]" />
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200 dark:border-neutral-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">or</span>
            </div>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 py-2 px-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  )
} 