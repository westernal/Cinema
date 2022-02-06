import Link from "next/dist/client/link";
import Head from 'next/head'
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Search from "./Search";

const Header = () => {

    const route = useRouter();
    const [pro,Setpro] = useState(false);

    useEffect(() => {

      

        if ( localStorage.getItem("token") != "" && localStorage.getItem("token") != null ) {
          
          Setpro(true);

        } else {

          Setpro(false);

        }
        

     
    },[])

    function logOut(e) {
        Setpro(false);
        localStorage.setItem('token', "");
        if (route.route == "/") {
          route.reload();
      } else route.push("/");
      }
     

    function opennav(e) {
        e.preventDefault();
        document.getElementById("myNav").style.width = "100%";
        document.getElementById("myNav").style.height = "100%";
      }
      
      function closenav() {
        document.getElementById("myNav").style.width = "0%";
      }
      


    return ( 
    
    <div className="header">
      <Head>
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
      <meta name='description' content='Description' />
      <meta name='keywords' content='Keywords' />
      <title>Cinema</title>
      <meta name="google-site-verification" content="HRGHGXtwdG3fqZYF59Cf3anXaEa5nWlDFr2VaT2vkSU" />
      <link rel="apple-touch-icon" sizes="57x57" href="/Images/apple-icon-57x57.png" />
<link rel="apple-touch-icon" sizes="60x60" href="/Images/apple-icon-60x60.png" />
<link rel="apple-touch-icon" sizes="72x72" href="/Images/apple-icon-72x72.png" />
<link rel="apple-touch-icon" sizes="76x76" href="/Images/apple-icon-76x76.png" />
<link rel="apple-touch-icon" sizes="114x114" href="/Images/apple-icon-114x114.png" />
<link rel="apple-touch-icon" sizes="120x120" href="/Images/apple-icon-120x120.png" />
<link rel="apple-touch-icon" sizes="144x144" href="/Images/apple-icon-144x144.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/Images/apple-icon-152x152.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/Images/apple-icon-180x180.png" />
<link rel="icon" type="image/png" sizes="192x192"  href="/Images/android-icon-192x192.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/Images/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="96x96" href="/Images/favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/Images/favicon-16x16.png" />
<link rel="manifest" href="/manifest.json" />
<meta name="msapplication-TileColor" content="#1e2130" />
<meta name="msapplication-TileImage" content="/Images/ms-icon-144x144.png" />
<meta name="theme-color" content="#1e2130"></meta>
        </Head>
         <div id="myNav" className="overlay">
        <a href="#" className="closebtn" onClick={closenav} >&times;</a>
        <div className="overlay-content">
        <Link href="/"><a id="home-tag"> خانه
        </a>  
         </Link>
         <Link href="/genres"><a id="genre-tag"> دسته بندی ها
        </a>  
         </Link>
        <Link href="/series"><a id="series-tag">سریال ها
        </a> 
         </Link>
        <Link href="/animations"><a id="animations-tag">انیمیشن ها
        </a>
          </Link>
          <Link href="/movies"><a id="films-tag">فیلم ها
        </a>
          </Link>
          {!pro && <Link href="/profile/sign-in"><a > ورود به حساب کاربری </a></Link> }
            {pro && <a  href="#" onClick={logOut}> خروج از حساب کاربری </a>}
        </div>
      </div>
     {!pro && <Link href="/profile/sign-in"><a  id="hbtn"> <button id="pro-btn">ورود</button> </a></Link> }
     {pro && <button id="logout-btn" onClick={logOut}>خروج</button> } 
        <div className="burger-menu" onClick={opennav}>
        <svg fill="none" height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg"><path d="M3 7C3 6.44771 3.44772 6 4 6H24C24.5523 6 25 6.44771 25 7C25 7.55229 24.5523 8 24 8H4C3.44772 8 3 7.55229 3 7Z" fill="white"/><path d="M3 14C3 13.4477 3.44772 13 4 13H24C24.5523 13 25 13.4477 25 14C25 14.5523 24.5523 15 24 15H4C3.44772 15 3 14.5523 3 14Z" fill="white"/><path d="M4 20C3.44772 20 3 20.4477 3 21C3 21.5523 3.44772 22 4 22H24C24.5523 22 25 21.5523 25 21C25 20.4477 24.5523 20 24 20H4Z" fill="white"/></svg>
        </div>
      <Search />
        <div className="menu">
        <Link href="/series"><a > <p id="series">سریال ها</p>
        </a> 
        </Link>
        <Link href="/animations"><a > <p id="animations">انیمیشن ها</p>
        </a>
         </Link>
        <Link href="/movies"><a >  <p id="movies">فیلم ها</p>
        </a>
         </Link>
            
        </div>
        <Link href="/"><a > <div className="logo">
            <p>سینما</p>
            <img src="/Images/glasses.svg" alt="website logo" />
        </div>
        </a>
        </Link>
    </div>

     );
}
 
export default Header;