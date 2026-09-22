"use client"

import { useTheme } from "next-themes"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: `
            cn-toast
            group
            border-2
            border-border
            rounded-md
            shadow-[4px_4px_0_var(--border)]
          `,

          title: `
            font-heading
            text-sm
            font-bold
          `,

          description: `
            text-sm
            text-muted-foreground
          `,

          actionButton: `
            border-2
            border-border
            bg-primary
            text-primary-foreground
            font-bold
            shadow-[2px_2px_0_var(--border)]
            hover:translate-x-[1px]
            hover:translate-y-[1px]
            hover:shadow-[1px_1px_0_var(--border)]
          `,

          cancelButton: `
            border-2
            border-border
            bg-background
            text-foreground
            font-bold
          `,

          success: `
            !bg-primary
            !text-primary-foreground
          `,

          info: `
            !bg-accent
            !text-accent-foreground
          `,

          warning: `
            !bg-primary
            !text-primary-foreground
          `,

          error: `
            !bg-destructive
            !text-destructive-foreground
          `,

          loading: `
            !bg-secondary
            !text-secondary-foreground
          `,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
