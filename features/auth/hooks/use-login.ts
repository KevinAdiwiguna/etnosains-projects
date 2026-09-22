import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authClient } from "@/lib/auth/auth-client"

export const useLogin = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setIsLoading(true)
        },
        onSuccess: () => {
          setIsLoading(false)
          toast.success("Berhasil masuk! Mengalihkan...")
          router.push("/")
        },
        onError: (ctx) => {
          setIsLoading(false)
          toast.error(
            ctx.error.message || "Gagal masuk. Periksa kembali email dan password Anda."
          )
        },
      }
    )
  }

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setIsGoogleLoading(true)
        },
        onError: (ctx) => {
          setIsGoogleLoading(false)
          toast.error(ctx.error.message || "Gagal masuk menggunakan Google.")
        },
      }
    )
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    isGoogleLoading,
    handleSubmit,
    handleGoogleSignIn,
  }
}
