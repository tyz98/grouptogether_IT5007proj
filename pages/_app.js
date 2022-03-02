import '../styles/globals.css'
import NavbarLayout from '../components/layouts/NavbarLayout'

function App({ Component, pageProps }) {
  return (
    <NavbarLayout>
      <Component {...pageProps} />
    </NavbarLayout>
  )
}

export default App
