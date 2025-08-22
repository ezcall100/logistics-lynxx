/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// 🎨 RADIX-BASED DRAWER COMPONENT (NO VAUL DEPENDENCY)
const Drawer = React.forwardRef<
  React.ElementRef<typeof Dialog.Root>,
  React.ComponentPropsWithoutRef<typeof Dialog.Root>
>(({ children, ...props }, ref) => (
  <Dialog.Root ref={ref} {...props}>
    {children}
  </Dialog.Root>
))
Drawer.displayName = "Drawer"

const DrawerTrigger = Dialog.Trigger

const DrawerPortal = Dialog.Portal

const DrawerClose = Dialog.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DrawerOverlay.displayName = "DrawerOverlay"

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
    side?: "top" | "right" | "bottom" | "left"
  }
>(({ className, children, side = "bottom", ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <Dialog.Content
      ref={ref}
      className={cn(
        "fixed z-50 bg-background shadow-lg border",
        // Side-specific positioning and animations
        side === "bottom" && [
          "inset-x-0 bottom-0 border-t",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
          "rounded-t-[10px]"
        ],
        side === "top" && [
          "inset-x-0 top-0 border-b",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
          "rounded-b-[10px]"
        ],
        side === "left" && [
          "inset-y-0 left-0 border-r",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
          "rounded-r-[10px]"
        ],
        side === "right" && [
          "inset-y-0 right-0 border-l",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
          "rounded-l-[10px]"
        ],
        className
      )}
      {...props}
    >
      {side === "bottom" && (
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      )}
      {children}
    </Dialog.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
