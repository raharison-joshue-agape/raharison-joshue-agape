import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react"

interface AuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem("admin_token")
            if (token) {
                setIsAuthenticated(true)
            }
            setTimeout(() => setIsLoading(false), 10000)
        }
        checkToken()
    }, [])

    const login = (token: string) => {
        localStorage.setItem("admin_token", token)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem("admin_token")
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, isLoading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const UseAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error(
            "UseAuth doit être utilisé à l'intérieur d'un AuthProvider"
        )
    }
    return context
}
