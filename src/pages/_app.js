import '../styles/global.scss'
import {GlobalProvider} from "../context/global/index.js"

function MyApp({ Component, pageProps }) {
  return (
  <GlobalProvider>
    <Component {...pageProps} />
  </GlobalProvider>)
}

export default MyApp
