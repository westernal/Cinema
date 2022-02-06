import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MoviesList from "../../components/MoviesList";
import { useState,useEffect } from "react";
import API from "../../requests/API"


const Animations = () => {

    const [films,Setfilms] = useState([]);

    useEffect(() => {
       async function getMovies() {
        const option = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }

        
        var result = await API(option,"api/film/genre/4");

        if (result.status == 200) {
            
            Setfilms(result.data.film_set);
           
       }
    }

    getMovies();

    },[])

    
    return ( <div className="animations-page">
        <Header />
        <div className="home-main">
            <div className="main-content">
            <div className="popular">
                
                    <h1>انیمیشن ها </h1>
            
            <MoviesList movies={films}/>
            </div>
            </div>
            <Navbar />
        </div>
        <Footer />
    </div> );
}
 
export default Animations;