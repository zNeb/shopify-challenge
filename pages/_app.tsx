import 'normalize.css';
import '@fontsource/roboto';
import 'styles/globals.css';
import '@reach/skip-nav/styles.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
