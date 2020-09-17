import React from 'react';
import Head from 'next/head';
import App, { AppProps, AppContext,} from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';
import { UserProvider } from '../components/UserProvider';
import { Nav } from '../components/Nav';
import '../style.css'
// import cookies from 'next-cookies'
export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  // if(cookie){
  //   global.authcookie=cookie
  // }
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <UserProvider cookie={pageProps.cookie}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Nav />
        <Component {...pageProps} />
      </ThemeProvider>
      </UserProvider>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const cookie = appContext.ctx.req?.headers.cookie

  // console.log(cookies(appContext.ctx))
  appProps.pageProps = Object.assign(appProps.pageProps, {cookie})

  return {  ...appProps }
}