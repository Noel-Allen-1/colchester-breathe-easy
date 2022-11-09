import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from '../services';
import 'bootstrap/dist/css/bootstrap.css'
import "font-awesome/css/font-awesome.css";
import '../styles/style.css';
import '../pages/common/navBar';
import NavBarNew from '../pages/common/navBar';
import Footer from "../pages/common/footer";

function MyApp({ Component, pageProps }) {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [authorized, setAuthorized] = useState(false);
//   useEffect(() => {
//     authCheck(router.asPath); 
//     const hideContent = () => setAuthorized(false);
//     router.events.on('routeChangeStart', hideContent);
//     router.events.on('routeChangeComplete', authCheck)
//     return () => {
//         router.events.off('routeChangeStart', hideContent);
//         router.events.off('routeChangeComplete', authCheck);
//     }
// }, []);
// function authCheck(url) {
//   setUser(userService.userValue);
//   const publicPaths = ['/account/login', '/account/register'];
//   const path = url.split('?')[0];
//   if (!userService.userValue && !publicPaths.includes(path)) {
//       setAuthorized(false);
//       router.push({
//           pathname: '/account/login',
//           query: { returnUrl: router.asPath }
//       });
//   } else {
//       setAuthorized(true);
//   }
// }
  return <div id="root"><NavBarNew /><Component {...pageProps} /><Footer /></div>
}

export default MyApp
