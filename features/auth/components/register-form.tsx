"use client"

import Link from "next/link"
import { useRegister } from "@/features/auth/hooks/use-register"
import { useLogin } from "@/features/auth/hooks/use-login"

// components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// icons
import { ArrowRight, Loader2 } from "lucide-react"
import { GrGoogle } from "react-icons/gr"

export const RegisterForm = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    handleSubmit,
  } = useRegister()
  const {
    handleGoogleSignIn,
    isGoogleLoading
  } = useLogin()

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <Input
        type="text"
        required
        title="NAMA LENGKAP"
        placeholder="masukkan nama lengkap"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading || isGoogleLoading}
      />

      <Input
        type="email"
        required
        title="EMAIL"
        placeholder="masukkan email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading || isGoogleLoading}
      />

      <div className="flex flex-col gap-4 md:flex-row">
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

        <Input
          type="password"
          required
          title="KONFIRMASI PASSWORD"
          placeholder="masukkan konfirmasi password"
          showPasswordToggle
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading || isGoogleLoading}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
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
            DAFTAR SEKARANG
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <hr className="my-4" />

      <Button
        type="button"
        className="w-full"
        variant="accent"
        onClick={handleGoogleSignIn}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GrGoogle className="mr-2" />
        )}
        DAFTAR DENGAN GOOGLE
      </Button>
    </form>
  )
}
