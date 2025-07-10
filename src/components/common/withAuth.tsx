"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return function ProtectedRoute(props: P): JSX.Element {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === "loading") return // Do nothing while loading
      if (!session) router.push("/auth/signin")
    }, [session, status, router])

    if (status === "loading") {
      return <div>Loading...</div>
    }

    if (!session) {
      return <div>Redirecting...</div>
    }

    return <WrappedComponent {...props} />
  }
}

