import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  
  return (
    <MoralisProvider initializeOnMount={false}>
      {getLayout(<Component {...pageProps} />)}

      <ToastContainer />
    </MoralisProvider>
  );
}

export default MyApp;
