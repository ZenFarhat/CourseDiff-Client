import "../styles/globals.css"
import type { AppProps } from "next/app"
import { AuthContextProvider } from "../contexts/AuthContext"
import { useRouter } from "next/router"
import ProtectedRoute from "../components/ProtectedRoute"
import DashboardLayout from "../components/DashboardLayout"
import ModalLayout from "../components/ModalLayout"
import LoadingSpinner from "../components/LoadingSpinner"
import SnackBar from "../components/SnackBar"
import Head from "next/head"

const noAuthRequired = ["/login", "/signup", "/", "/[companyName]/[videoName]", "/pricing", "/features"]

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>CourseDiff</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="The only tool you need to improve your course delivery experience." />
      </Head>
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
    </>
  )
}

export default MyApp
