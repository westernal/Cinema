import Footer from "../../components/Footer";
import Header from "../../components/Header";
import API from "../../requests/API"
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";


const Edit = () => {

    const [fail,Setfail] = useState(false);
    const [success,Setsuccess] = useState(false);
    const [user,Setuser] = useState({name: "",username:"",email:""});
    const [fail2,Setfail2] = useState(false);
    const [fail3,Setfail3] = useState(false);
    const [pw,Setpw] = useState(false);
    const route = useRouter();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    

    useEffect(() => {
        async function userInfo() {
            const option = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}` },
                redirect: 'follow'
            }
    
            
            
            var result = await API(option,"api/user/info/");
            
            
            if (result.status == 200) {
               
                Setuser(result.data.results[0])
                
            } 
        }
        if ( localStorage.getItem("token") != "" && localStorage.getItem("token") != null ) {
          userInfo();
        }
    },[])

    async function edit() {

        Setfail(false);
        Setsuccess(false);
        Setfail2(false);
        Setfail3(false);
        Setpw(false);

        if ((document.getElementById("password") as HTMLInputElement).value != (document.getElementById("rpassword") as HTMLInputElement).value &&
        (document.getElementById("rpassword") as HTMLInputElement).value != "") {
            Setfail2(true);
            return
        }

        if ((document.getElementById("password") as HTMLInputElement).value != "" ) {
            Setpw(true);
        } else Setpw(false)

        if ((document.getElementById("password") as HTMLInputElement).value.length < 8 && pw) {
            Setfail3(true)
            return
        }

        

        for (let i = 0; i < 5; i++) {
            if (document.getElementsByTagName("input")[i].value == "") {
                document.getElementsByTagName("input")[i].value = document.getElementsByTagName("input")[i].placeholder;
            }
        }



      let option;

      if(pw) {
         option = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('token')}` },
            body: JSON.stringify({
                email: (document.getElementById("email") as HTMLInputElement).value.toLowerCase(),
                password: (document.getElementById("password") as HTMLInputElement).value,
                name: (document.getElementById("name") as HTMLInputElement).value.toLowerCase()
            }),
            redirect: 'follow'
        }
      } else {
         option = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('token')}` },
            body: JSON.stringify({
                email: (document.getElementById("email") as HTMLInputElement).value.toLowerCase(),
                name: (document.getElementById("name") as HTMLInputElement).value.toLowerCase()
            }),
            redirect: 'follow'
        }
      }
 
        
        
        var result = await API(option,"api/user/update/");
        
        // console.log(result);

        if (result.status == 200) {
            
            Setsuccess(true);
            await sleep(1000);
            route.push(`/profile/${route.query.id}`)
        } else Setfail(true);
    }
    
    return ( <div className="profile-page">
        <Header />

        <div className="sign-in">
            
                <div className="sign-card" id="signup">
                <input type="text" placeholder={user.name} id="name" />    
                <input type="text" placeholder={user.email} id="email"/>
                <input type="text" placeholder="رمز عبور" id="password" />
                <input type="text" placeholder="تکرار رمز عبور" id="rpassword" />
                {success && <p id="success">اطلاعات با موفقیت ویرایش شد.</p>}
                {fail && <p id="fail">مشکلی پیش آمده لطفا دوباره تلاش کنید.</p>}
                {fail3 && <p id="fail">رمز عبور باید بیش از 8 کاراکتر باشد.</p>}
                {fail2 && <p id="fail">تکرار رمز عبور باید تطابق داشته باشد.</p>}
                <button onClick={edit}>ویرایش</button>
                </div>
            
        </div>

        <Footer />
        
    </div> );
}
 
export default Edit;