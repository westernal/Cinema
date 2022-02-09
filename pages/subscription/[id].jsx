import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import API from "../../requests/API";
import { useRouter } from "next/router";
import { Puff } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const Subscribe = () => {

    const router = useRouter()
    const [fail,Setfail] = useState(false);
    const [success,Setsuccess] = useState(false);
    const [load,Setload] = useState(false);
    const [gotSubs,SetGotSubs] = useState(false);
    const [sub,SetSub] = useState({nameOf: "", price: 0 , subID:0});
    

    useEffect(() => {
        SetGotSubs(false)

        async function getSub() {
         const option = {
             method: 'GET',
             headers: { 'Content-Type': 'application/json' },
             redirect: 'follow'
         }
 
         
         var result = await API(option,`api/subscription/${router.query.id}`);
         
 
         if (result.status == 200) {
          SetSub(result.data);
          SetGotSubs(true)
        }
     }

    getSub();

    },[router.query])

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

   async function buySubscription() {
       Setload(true);
       Setfail(false)
       Setsuccess(false);
       
       const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('token')}` },
        body: JSON.stringify({
            subscription: sub.subID
        }),
        redirect: 'follow'
    }

        

        
        var response = await fetch("https://rest.amdeveloper.xyz/api/subscription/buy/",option);
        

        const data = await response.text();

       

        if (response.status == 201) {
            localStorage.setItem('sub', sub.nameOf);
        Setsuccess(true);
        Setload(false);

        await sleep(1000);
            router.push(`/`)
        }
        else {
            Setfail(true)
            Setload(false)
            await sleep(1000);
            router.push(`/`)
        }
    }
    
   
    return ( <div className="sub-page">
        <Header />
        <div className="sub-header">
        {gotSubs && 
                <div className="subscription" key={sub.subID}>
                    <img src="/Images/Subscribe-Now-Neon-Sign.jpg" alt="subscription" />
                    <div className="sub-info">
                        <h2>{sub.nameOf}</h2>
                        <h3>{sub.price}</h3>
                    </div>
                    {fail && <p id="fail">اعتبار حساب شما كافي نيست.</p>}
                {success && <p id="success">اشتراك مورد نظر با موفقيت خريداري شد.</p>}
                {load && <div className="loader"><Puff color="#1f6cf0" height={40} width={40} /></div>}
                    <div className="sub-btn">
                        <button onClick={buySubscription}>خريد</button>
                    </div>
                </div>
            
}
    
    
</div>
       
            <Footer />

    </div> );
}
 
export default Subscribe;