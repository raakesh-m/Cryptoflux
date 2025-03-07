'use client';

import { useState } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "@/app/components/ui/sidebar"
import {
  IconDashboard,
  IconChartBar,
  IconWallet,
  IconExchange,
  IconSettings,
  IconLogout
} from "@tabler/icons-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"

// Main layout component
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  // Navigation links configuration
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Portfolio",
      href: "/portfolio",
      icon: <IconWallet className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Market Analysis",
      href: "/market",
      icon: <IconChartBar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Exchange",
      href: "/exchange",
      icon: <IconExchange className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconLogout className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => signOut(),
    },
  ]

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          {session?.user && (
            <div>
              <SidebarLink
                link={{
                  label: session.user.name || "User",
                  href: "/settings",
                  icon: session.user.image ? (
                    <Image
                      src={session.user.image}
                      className="h-7 w-7 min-w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ) : (
                    <div className="h-7 w-7 min-w-7 flex-shrink-0 rounded-full bg-neutral-300" />
                  ),
                }}
              />
            </div>
          )}
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

const Logo = () => {
  return (
    <Link href="/" className="font-normal  space-x-2 items-center text-sm md:flex hidden text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white  whitespace-pre"
      >
        CryptoFlux
      </motion.span>
    </Link>
  )
}

const LogoIcon = () => {
  return (
    <Link href="/" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  )
} 