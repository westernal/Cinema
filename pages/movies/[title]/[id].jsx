import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import MoviesList from "../../../components/MoviesList";
import MovieInfo from "../../../components/MovieInfo";
import { useEffect, useState } from "react";
import API from "../../../requests/API";
import Comments from "../../../components/Comments"
import { useRouter } from "next/router";


const Movies = () => {

    const Router = useRouter()
    const [filmID,SetfilmID] = useState(0);
    const [films,Setfilms] = useState([]);
    const [movie,Setmovie] = useState([]);
    const [refresh,Setrefresh] = useState(false)
    
    

    useEffect(() => {
        SetfilmID(Router.query.id)

        async function getThisMovie() {
            let option
            if ( localStorage.getItem("token") != "" && localStorage.getItem("token") != null ) {
             option = {
             method: 'GET',
             headers: { 'Content-Type': 'application/json',
             'Accept': 'application/json',
             'Authorization': `JWT ${localStorage.getItem('token')}` },
            
             redirect: 'follow'
         }
     } else {
          option = {
             method: 'GET',
             headers: { 'Content-Type': 'application/json' },
            
             redirect: 'follow'
         }
     }
        
         var result = await API(option,`api/film/film/${Router.query.id}`);
        
         
         if (result.status == 200) {
            
           
             Setmovie(result.data);
            
           
        } 
     }
       async function getMovies() {
        const option = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }

        
        var result = await API(option,"api/search/?order_by=releaseDate_desc");
        

        if (result.status == 200) {
            const list = result.data.results.splice(0,5)
            Setfilms(list);
           
       }
    }

    getMovies();
    if (Router.query.id) {
        getThisMovie()
    }
Setrefresh(false)
    },[Router.query,refresh])

    function Refresh() {
        Setrefresh(true)
    }
    
   
    return ( <div className="movies-page">
        <Header />
       <MovieInfo movie={movie}/>
        <div className="popular">
                <div className="popular-title">
                   
                    <h3>فیلم های مشابه</h3>
                </div>
               <MoviesList movies={films}/>
            </div>
            <Comments filmID={filmID} movie={movie} refresh={Refresh}/>
            <Footer />

    </div> );
}
 
export default Movies;