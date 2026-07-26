import { Navigate, Outlet } from "react-router-dom"
import { UseAuth } from "@/context/AuthContext"
import { cn } from "@/lib/utils"

export default function PublicRoute() {
    const { isAuthenticated, isLoading } = UseAuth()

    if (isLoading) {
        return (
            <div
                className={cn(
                    "flex h-screen w-full items-center justify-center",
                    "bg-gray-950 text-slate-100"
                )}
            >
                <div className="My-loader" />
            </div>
        )
    }

    return isAuthenticated ? (
        <Navigate to="/portfolio/dashboard" replace />
    ) : (
        <Outlet />
    )
}
