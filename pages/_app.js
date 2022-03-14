import '../styles/globals.css'
import NavbarLayout from '../components/layouts/NavbarLayout'
import { SessionProvider } from "next-auth/react"

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <NavbarLayout>
        <Component {...pageProps} />
      </NavbarLayout>
    </SessionProvider> 
  )
}

export default App
