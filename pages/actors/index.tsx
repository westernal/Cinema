import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import API from "../../requests/API";

const Actors = () => {

    const [celebs,SetCelebs] = useState([]);
    const [gotCelebs,SetGotCelebs] = useState(false);
    const [Page,SetPage] = useState(1);
    const [Pd,SetPd] = useState(false);
    const [Nd,SetNd] = useState(false);
   

    useEffect(() => {

        if (Page == 1) {
            SetPd(true)
        } else SetPd(false)

        SetGotCelebs(false)

       async function getActors() {
        const option = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }

        
        var result = await API(option,`api/film/celebrity/?page=${Page}`);
        

        if (result.status == 200) {
            if (result.data.count/10 <= Page) {
                SetNd(true)
            }else SetNd(false)
         SetCelebs(result.data.results);
         SetGotCelebs(true)
       }
    }

    getActors();

    },[Page])

    function Next() {
        SetPage(Page + 1)
    }

    function Back() {
        SetPage(Page - 1)
    }

    


    return ( <div className="actors">
        <Header />
        <div className="home-main">
        <div className="popular">
                
                   
                    <h1> هنرمندان</h1>
                
             <div className="sub-list">
            {gotCelebs && celebs.map(celeb => ( 
               <Link href={`/actors/${celeb.celebID}`} key={celeb.celebID}><a > <div className="subscription" id="celebBox">
               <img id="celebProfile" src="/Images/profile.svg" alt="celebrity" />

                   <h4 id="celeb">{celeb.nameOf}</h4>
                   
               
           </div></a></Link>
            )
)}
             </div>
             <Pagination Ndisabled={Nd} Pdisabled={Pd} next={Next} back={Back}/>
            </div>
            <Navbar />
            </div>
            <Footer />
    </div> );
}
 
export default Actors;