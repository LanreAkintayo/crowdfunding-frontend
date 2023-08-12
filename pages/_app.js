import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
 
        <Component {...pageProps} />

       <ToastContainer />
    </MoralisProvider>
  );
}

export default MyApp;
