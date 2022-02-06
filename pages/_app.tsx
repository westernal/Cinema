import Store from "../components/store"
import "../public/css/style.css"
import HttpsRedirect from 'react-https-redirect';



function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <HttpsRedirect>
  <Component {...pageProps} />
  </HttpsRedirect>
  </Store>
  )
}

export default MyApp
