import Link from "next/dist/client/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import API from "../../requests/API"
import { useRouter } from "next/router";
import { useState } from "react";
import { Puff } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import  GoogleLogin  from 'react-google-login';




const SignIn = () => {
    
   
    const route = useRouter(); 
    const [loginFail,SetLoginFail] = useState(false);
    const [load,Setload] = useState(false);
    

    async function logIn() {
        Setload(true);
        SetLoginFail(false);
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: document.getElementById("username").value.toLowerCase(),
                password: document.getElementById("password").value
            }),
            redirect: 'follow'
        }

        
        var result = await API(option,"api/user/token/");
        
        
        

        if (result.status == 200) {
            Setload(false);
            localStorage.setItem('token', result.data.access);
           
            if (route.route == "/") {
                route.reload();
            } else route.push("/");
        } else { 
            Setload(false)
            SetLoginFail(true) }

       
    }

    async function GoogleOK(res) {
       
       
        Setload(true);
        SetLoginFail(false);
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: res.profileObj.email.split("@",1)[0].toLowerCase(),
                password:"12345678"
            }),
            redirect: 'follow'
        }

        
        var result = await API(option,"api/user/token/");
       
        

        if (result.status == 200) {
            Setload(false);
            localStorage.setItem('token', result.data.access);
            localStorage.setItem('sub', result.data.current_subscription);
            if (route.route == "/") {
                route.reload();
            } else route.push("/");
        } else { 
            Setload(false)
            SetLoginFail(true) }
        
    }

    function GoogleFail(res) {
        SetLoginFail(true)
    }

    
    
    return ( 
    
    <div className="profile-page">
        <Header />

        

        <div className="sign-in">
            
                <div className="sign-card">
                <input type="text" placeholder="شناسه کاربری" id="username"/>
                <input type="password" placeholder="رمز عبور" id="password" />
                {loginFail && <p id="fail">نام کاربری یا رمز عبور اشتباه است.</p>}
                {load && <div className="loader"><Puff color="#1f6cf0" height={40} width={40} /></div>}
                <button onClick={logIn}>ورود</button>
                <GoogleLogin
    clientId="191100241151-987j9coc1u1tig3iqpbm1mn88ltar5uo.apps.googleusercontent.com"
    buttonText="ورود با گوگل"
    onSuccess={GoogleOK}
    onFailure={GoogleFail}
    cookiePolicy={'single_host_origin'}
  />
                <p>پروفایل کاربری ندارید؟ <Link href="/profile/sign-up"><a >ثبت نام کنید.</a></Link></p>
                </div>
            
        </div>

        <Footer />
        
    </div> );
}
 
export default SignIn;