import "@/styles/index.css"

import App from "@/pages/App"
import { StrictMode } from "react"
import LoginPage from "./pages/Login"
import NotFoundPage from "@/pages/NotFound"
import { createRoot } from "react-dom/client"
import AdminLayout from "./layouts/AdminLayout"
import AdminMessage from "@/pages/admin/Message"
import PublicRoute from "@/context/PublicRoute"
import PrivateRoute from "@/context/PrivateRoute"
import AdminDashboard from "./pages/admin/Dashboard"
import { AuthProvider } from "@/context/AuthContext"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    {
        element: <PublicRoute />,
        children: [{ path: "/auth/admin-login", element: <LoginPage /> }],
    },
    {
        element: <PrivateRoute />,
        children: [
            {
                path: "/portfolio",
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="dashboard" replace />,
                    },
                    { path: "dashboard", element: <AdminDashboard /> },
                    { path: "messages", element: <AdminMessage /> },
                ],
            },
        ],
    },
    { path: "*", element: <NotFoundPage /> },
])

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider defaultTheme="system">
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>
)
