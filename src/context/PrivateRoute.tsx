import { Navigate, Outlet } from "react-router-dom"
import { UseAuth } from "@/context/AuthContext"
import { cn } from "@/lib/utils"

export default function PrivateRoute() {
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
        <Outlet />
    ) : (
        <Navigate to="/auth/admin-login" replace />
    )
}
