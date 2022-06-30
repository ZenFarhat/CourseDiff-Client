import "../styles/globals.css"
import type { AppProps } from "next/app"
import { AuthContextProvider } from "../contexts/AuthContext"
import { useRouter } from "next/router"
import ProtectedRoute from "../components/ProtectedRoute"
import DashboardLayout from "../components/DashboardLayout"
import ModalLayout from "../components/ModalLayout"

const noAuthRequired = ["/login", "/signup", "/", "/user/"]

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </ProtectedRoute>
      )}
      <ModalLayout />
    </AuthContextProvider>
  )
}

export default MyApp
