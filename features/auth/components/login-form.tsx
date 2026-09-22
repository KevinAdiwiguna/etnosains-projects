"use client"

import Link from "next/link"
import { useLogin } from "@/features/auth/hooks/use-login"

// components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// icons
import { ArrowRight, Loader2 } from "lucide-react"
import { GrGoogle } from "react-icons/gr"

export const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    isGoogleLoading,
    handleSubmit,
    handleGoogleSignIn,
  } = useLogin()

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <Input
        type="email"
        required
        title="EMAIL"
        placeholder="masukkan email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading || isGoogleLoading}
      />

      <Input
        type="password"
        required
        title="PASSWORD"
        placeholder="masukkan password"
        showPasswordToggle
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading || isGoogleLoading}
      />

      <Button
        type="submit"
        className="w-full cursor-pointer"
        variant="primary"
        disabled={isLoading || isGoogleLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            MEMPROSES...
          </>
        ) : (
          <>
            LANJUTKAN KE MODUL PEMBELAJARAN
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <hr className="my-4" />

      <Button
        type="button"
        className="w-full cursor-pointer"
        variant="accent"
        onClick={handleGoogleSignIn}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GrGoogle className="mr-2" />
        )}
        MASUK DENGAN GOOGLE
      </Button>
    </form>
  )
}
