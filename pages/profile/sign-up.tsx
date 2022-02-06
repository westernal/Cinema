import Link from "next/dist/client/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import API from "../../requests/API"
import { useState } from "react";
import { Puff } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import  GoogleLogin  from 'react-google-login';

const SignUp = () => {

    const route = useRouter();
    const [emailError,SetEmailError] = useState(false);
    const [repeatPasswordError,SetRepeatPasswordError] = useState(false);
    const [load,Setload] = useState(false);
    const [passwordError,SetPasswordError] = useState(false);
    const [usernameError,SetUsernameError] = useState(false);
    

    async function signUp() {

        Setload(true);
        SetUsernameError(false);
        SetRepeatPasswordError(false);
        SetEmailError(false);
        SetPasswordError(false);

        if ((document.getElementById("password") as HTMLInputElement).value != (document.getElementById("rpassword") as HTMLInputElement).value &&
        (document.getElementById("rpassword") as HTMLInputElement).value != "") {
            SetRepeatPasswordError(true);
            Setload(false);
            return
        }

        if ((document.getElementById("password") as HTMLInputElement).value.length < 8) {
            SetPasswordError(true)
            Setload(false);
            return
        }
       
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: (document.getElementById("username") as HTMLInputElement).value.toLowerCase(),
                email: (document.getElementById("email") as HTMLInputElement).value.toLowerCase(),
                password: (document.getElementById("password") as HTMLInputElement).value,
                name: (document.getElementById("name") as HTMLInputElement).value.toLowerCase()
            }),
            redirect: 'follow'
        }
        
        var result = await API(option,"api/user/create/");
     

        if (result.status == 201) {
            Setload(false);
            route.push("/profile/sign-in")
        } else {
            handleError(result.data);
            Setload(false);
            
        }
    }

    function handleError(error) {
        if (error.email) {
            SetEmailError(true);
        }

        if (error.username) {
            SetUsernameError(true);
        }
    }

    async function GoogleOK(res) {
        Setload(true);
        SetEmailError(false);
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: res.profileObj.email.split("@",1)[0].toLowerCase() ,
                email: res.profileObj.email.toLowerCase(),
                name: res.profileObj.name.toLowerCase(),
                password:"12345678",
                emailActivation: true
            }),
            redirect: 'follow'
        }

        
        
        var result = await API(option,"api/user/create/");
        console.log(result);
        console.log(res.profileObj.email.split("@",1)[0].toLowerCase());

        if (result.status == 201) {
            Setload(false);
            route.push("/profile/sign-in")
        } else {
            Setload(false);
            handleError(result.data);
        }
        
    }

    function GoogleFail() {
        SetEmailError(true);
    }
    
    return ( <div className="profile-page">
        <Header />

        <div className="sign-in">
            
                <div className="sign-card" id="signup">
                <input type="text" placeholder="نام" id="name"/>    
                <input type="text" placeholder="شناسه کاربری" id="username"/>
                <input type="text" placeholder="ایمیل" id="email"/>
                <input type="password" placeholder="رمز عبور" id="password" />
                <input type="password" placeholder="تکرار رمز عبور" id="rpassword" />

                {usernameError && <p id="fail">نام كاربري وارد شده قبلا ثبت شده است.</p>}
                {emailError && <p id="fail">ایمیل وارد شده قبلا ثبت شده است.</p>}
                {repeatPasswordError && <p id="fail">تکرار رمز عبور باید تطابق داشته باشد.</p>}
                {passwordError && <p id="fail">رمز عبور باید بیش از 8 کاراکتر باشد.</p>}

                {load && <div className="loader"><Puff color="#1f6cf0" height={40} width={40} /></div>}
                <button onClick={signUp}>ثبت نام</button>
                            <GoogleLogin
                            clientId="191100241151-987j9coc1u1tig3iqpbm1mn88ltar5uo.apps.googleusercontent.com"
                            buttonText="ثبت نام با گوگل"
                            onSuccess={GoogleOK}
                            onFailure={GoogleFail}
                            cookiePolicy={'single_host_origin'}
            />
                <p>پروفایل کاربری دارید؟ <Link href="/profile/sign-in"><a >  وارد شوید.</a></Link></p>
                </div>
            
        </div>

        <Footer />
        
    </div> );
}
 
export default SignUp;