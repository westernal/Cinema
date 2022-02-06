import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import API from "../../../requests/API"
import { useRouter } from "next/router";
import { useState } from "react";
import { Puff } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";



const Pay = () => {
    
    const route = useRouter();
    const [fail,Setfail] = useState(false);
    const [load,Setload] = useState(false);
    const [success,Setsuccess] = useState(false);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    

    async function addMoneyToAccount() {
        Setsuccess(false);
        Setload(true);
        Setfail(false);
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('token')}` },
            body: JSON.stringify({
                amount: document.getElementById("amount").value
            }),
            redirect: 'follow'
        }

       

        
        var result = await API(option,"api/user/pay/");

        
        

        if (result.status == 201) {
            Setload(false);
            Setsuccess(true);
            await sleep(1000);
            route.push(`/profile/${route.query.id}`)

           } else { Setload(false) }

       
    }

    
    
    return ( <div className="profile-page">
        <Header />

        

        <div className="sign-in">
                
                <div className="sign-card">
                <input type="text" placeholder=" مقدار پول" id="amount"/>
                {fail && <p id="fail">اشتباهی رخ داده است. لطفا دوباره تلاش کنید.</p>}
                {success && <p id="success">اکانت شما با موفقیت شارژ شد.</p>}
                {load && <div className="loader"><Puff color="#1f6cf0" height={40} width={40} /></div>}
                <button onClick={addMoneyToAccount}>شارژ</button>
               
                </div>
            
        </div>

        <Footer />
        
    </div> );
}
 
export default Pay;