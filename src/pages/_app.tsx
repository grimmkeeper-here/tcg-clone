import "@/styles/globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the styles (add this line)
import type { AppProps } from "next/app";
import { UserProvider } from "@/context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
