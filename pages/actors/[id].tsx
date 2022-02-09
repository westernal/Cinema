import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MoviesList from "../../components/MoviesList";
import { useEffect, useState } from "react";
import API from "../../requests/API";
import { useRouter } from "next/router";


const Actor = () => {

    const router = useRouter()
    const [films,Setfilms] = useState([]);
    const [actor,Setactor] = useState({nameOf:""});
    const [filmDirected,SetfilmDirected] = useState([])
    

    useEffect(() => {
       async function getActor() {
        const option = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }

        
        var result = await API(option,`api/film/celebrity/${router.query.id}`);
        

        if (result.status == 200) {
            
            Setfilms(result.data.film_actor);
            Setactor(result.data);
            SetfilmDirected(result.data.film_director)
       }
    }

    getActor();

    },[router.query])
    
   
    return ( <div className="actors-page">
        <Header />
        <div className="profile-header">
    <div className="profile-pic">
        <img src="/Images/photo_2021-01-28_21-12-12-removebg-preview (1).jpg" alt="profile picture" />
    </div>
    <h1> {actor.nameOf}</h1>
    
</div>
        <div className="popular">
               
                   
                    <h3>فیلم ها و سريال ها </h3>
                
               <MoviesList movies={films}/>
               <MoviesList movies={filmDirected} />
            </div>
            <Footer />

    </div> );
}
 
export default Actor;