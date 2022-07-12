import "../styles/globals.css"
import type { AppProps } from "next/app"
import { AuthContextProvider } from "../contexts/AuthContext"
import { useRouter } from "next/router"
import ProtectedRoute from "../components/ProtectedRoute"
import DashboardLayout from "../components/DashboardLayout"
import ModalLayout from "../components/ModalLayout"
import LoadingSpinner from "../components/LoadingSpinner"
import SnackBar from "../components/SnackBar"
import SideNav from "../components/SideNav"
import ComponentRequiresAuth from "../components/ComponentRequiresAuth"

const noAuthRequired = ["/login", "/signup", "/", "/[companyName]/[videoName]"]

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
      <LoadingSpinner />
      <SnackBar />
    </AuthContextProvider>
  )
}

export default MyApp
