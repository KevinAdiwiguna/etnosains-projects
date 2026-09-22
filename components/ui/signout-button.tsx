"use client"

import { useSignout } from "@/features/auth/hooks/use-signout"
import { Button } from "@/components/ui/button"
import { Loader2, LogOut } from "lucide-react"

export const SignOutButton = () => {
  const { handleSignout, isLoading } = useSignout()

  return (
    <Button
      variant="accent"
      size="sm"
      className="w-full justify-start cursor-pointer bg-destructive"
      onClick={handleSignout}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      Keluar
    </Button>
  )
}
