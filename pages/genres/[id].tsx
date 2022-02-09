import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MoviesList from "../../components/MoviesList";
import Navbar from "../../components/Navbar";
import API from "../../requests/API";
import { useRouter } from "next/router";

const Genre = () => {

    const router = useRouter()
    const [genre,Setgenre] = useState({nameOf:"",film_set:[]});
    const [ok,Setok] = useState(false);
    

    useEffect(() => {
       async function getMovies() {
        const option = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }

        
        var result = await API(option,`api/film/genre/${router.query.id}`);
        
        

        if (result.status == 200) {
            
            Setgenre(result.data);
            Setok(true);
           }
    }

    if (router.query.id) {
        getMovies();
    }

    },[router.query])
    return ( <div className="genre">
        <Header />
        <div className="home-main">
        <div className="popular">
                
                   
                    <h1>{ok && genre.nameOf}</h1>
                
             {ok && <MoviesList movies={genre.film_set}/>}
            </div>
            <Navbar />
            </div>
            <Footer />
    </div> );
}
 
export default Genre;