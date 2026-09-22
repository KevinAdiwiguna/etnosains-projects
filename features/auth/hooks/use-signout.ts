import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authClient } from "@/lib/auth/auth-client"

export const useSignout = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignout = async (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault()

    const toastId = toast.loading("Memproses keluar...")
    setIsLoading(true)

    try {
      const { error } = await authClient.signOut()

      toast.dismiss(toastId)

      if (error) {
        toast.error(error.message || "Gagal keluar. Silakan coba lagi.")
        return
      }

      toast.success("Berhasil keluar! Mengalihkan...")
      router.refresh()
      router.push("/")
    } catch {
      toast.dismiss(toastId)
      toast.error("Terjadi kesalahan sistem. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleSignout,
    isLoading,
  }
}
