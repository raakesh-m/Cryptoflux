"use client"
import { cn } from "@/app/lib/utils"
import Link from "next/link"
import type React from "react"
import { useState, createContext, useContext } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { IconMenu2, IconX } from "@tabler/icons-react"

interface Links {
  label: string
  href: string
  icon: React.JSX.Element | React.ReactNode
  onClick?: () => void
}

interface SidebarContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  animate: boolean
}

const SidebarContext = createContext<SidebarContextProps>({
  open: false,
  setOpen: () => {},
  animate: true,
})

const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate = true,
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) => {
  const [openState, setOpenState] = useState(false)
  const openValue = open !== undefined ? open : openState
  const setOpenValue = setOpen !== undefined ? setOpen : setOpenState

  return (
    <SidebarContext.Provider value={{ open: openValue, setOpen: setOpenValue, animate }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  )
}

export const DesktopSidebar = ({ className, children, ...props }: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar()
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0",
        className,
      )}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const MobileSidebar = ({ className, children, ...props }: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar()
  return (
    <>
      <div
        className={cn(
          "h-14 px-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full",
        )}
        {...props}
      >
        <div className="flex items-center gap-3 z-20">
          <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
          <span className="font-medium text-black dark:text-white">CryptoFlux</span>
        </div>
        <div className="flex justify-end z-20">
          <IconMenu2 className="text-neutral-800 dark:text-neutral-200" onClick={() => setOpen(!open)} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-6 z-[100] flex flex-col justify-between",
                className,
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-0 md:mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
                    <span className="font-medium text-black dark:text-white">CryptoFlux</span>
                  </div>
                  <div className="text-neutral-800 dark:text-neutral-200" onClick={() => setOpen(!open)}>
                    <IconX />
                  </div>
                </div>
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export const SidebarLink = ({ link }: { link: Links }) => {
  const { open } = useSidebar()
  return (
    <Link
      href={link.href}
      onClick={link.onClick}
      className={`flex items-center ${open ? 'justify-start' : 'justify-center'} gap-3 px-3 py-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors`}
    >
      {link.icon}
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="whitespace-pre"
          >
            {link.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  )
} 