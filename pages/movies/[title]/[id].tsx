import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import MoviesList from "../../../components/MoviesList";
import MovieInfo from "../../../components/MovieInfo";
import { useEffect, useState } from "react";
import API from "../../../requests/API";


const Movies = () => {

    const [films,Setfilms] = useState([]);
    

    useEffect(() => {
       async function getMovies() {
        const option = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }

        
        var result = await API(option,"api/film/film/?page=1");
        

        if (result.status == 200) {
            const list = result.data.results.splice(0,5)
            Setfilms(list);
           
       }
    }

    getMovies();

    },[])
    
   
    return ( <div className="movies-page">
        <Header />
       <MovieInfo />
        <div className="popular">
                <div className="popular-title">
                   
                    <h3>فیلم های مشابه</h3>
                </div>
               <MoviesList movies={films}/>
            </div>
            <Footer />

    </div> );
}
 
export default Movies;