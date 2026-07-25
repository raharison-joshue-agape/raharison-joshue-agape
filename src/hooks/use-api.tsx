import { useCallback } from "react"
import { getAccessToken } from "@/services/token-service"

export const BASE_USER_API = import.meta.env.VITE_API_URL
export const WEB_SOCKET_BASE = import.meta.env.VITE_WEBSOCKET_URL

export const SEND_MESSAGE = "/api/v1/clients"
export const ASK_IA = "/api/v1/ask-ia"
export const LOGIN_API = "/api/v1/auth/login"

type ApiResponse<T> = {
    message: string
    success: boolean
    status_code: number
    data?: T
}

type RequestOptions<TBody = unknown> = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    headers?: HeadersInit
    body?: TBody
}

export function useApi<T = unknown>() {
    const request = useCallback(
        async <TBody = unknown,>(
            endpoint: string,
            options?: RequestOptions<TBody>
        ): Promise<ApiResponse<T> | null> => {
            const token = getAccessToken()

            const headers = new Headers(options?.headers)
            headers.set("Content-Type", "application/json")

            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }

            const res = await fetch(`${BASE_USER_API}${endpoint}`, {
                method: options?.method || "GET",
                headers,
                credentials: "include",
                body: options?.body ? JSON.stringify(options.body) : undefined,
            })

            const json: ApiResponse<T> = await res.json()
            return json
        },
        []
    )

    return { request }
}
