import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MoviesList from "../../components/MoviesList";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import API from "../../requests/API";

const Subscription = () => {

    const [subs,SetSubs] = useState([]);
    const [gotSubs,SetGotSubs] = useState(false);
   

    useEffect(() => {

        SetGotSubs(false)

       async function getSubs() {
        const option = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }

        
        var result = await API(option,`api/subscription/`);
        

        if (result.status == 200) {
         SetSubs(result.data.results);
         SetGotSubs(true)
       }
    }

    getSubs();

    },[])

    


    return ( <div className="subs">
        <Header />
        <div className="home-main">
        <div className="popular">
                
                   
                    <h1>  اشتراك ها</h1>
                
             <div className="sub-list">
            {gotSubs && subs.map(subs => ( 
               <Link href={`/subscription/${subs.subID}`} key={subs.subID}><a >
                    <div className="subscription" >
                    <img src="/Images/Subscribe-Now-Neon-Sign.jpg" alt="subscription" />
                    <div className="sub-info">
                        <h2>{subs.nameOf}</h2>
                        <h3>{subs.price}</h3>
                    </div>
                </div></a></Link>
            )
)}
             </div>
             
            </div>
            <Navbar />
            </div>
            <Footer />
    </div> );
}
 
export default Subscription;