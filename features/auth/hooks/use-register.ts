import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authClient } from "@/lib/auth/auth-client"

export const useRegister = () => {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Konfirmasi password tidak cocok dengan password!")
      return
    }

    await authClient.signUp.email(
      {
        name,
        email,
        password,
        callbackURL: "/signin",
      },
      {
        onRequest: () => {
          setIsLoading(true)
        },
        onSuccess: () => {
          setIsLoading(false)
          toast.success("Akun berhasil dibuat! Silakan cek email Anda untuk verifikasi.")
          router.push("/signin")
        },
        onError: (ctx) => {
          setIsLoading(false)
          toast.error(
            ctx.error.message || "Gagal mendaftar. Silakan coba lagi."
          )
        },
      }
    )
  }

  return {
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
  }
}
