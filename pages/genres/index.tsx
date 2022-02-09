import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MoviesList from "../../components/MoviesList";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import API from "../../requests/API";

const Genres = () => {

    const [films,Setfilms] = useState([]);
    const [ok,Setok] = useState(false);
    const [Page,SetPage] = useState(1);
    const [Pd,SetPd] = useState(false);
    const [Nd,SetNd] = useState(false);

    useEffect(() => {

        if (Page == 1) {
            SetPd(true)
        } else SetPd(false)

       async function getMovies() {
        const option = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }

        
        var result = await API(option,`api/film/genre/?page=${Page}`);
        

        if (result.status == 200) {
            if (result.data.count/10 <= Page) {
                SetNd(true)
            } else SetNd(false)
            Setfilms(result.data.results);
           Setok(true);
       }
    }

    getMovies();

    },[Page])

    function Next() {
        SetPage(Page + 1)
    }

    function Back() {
        SetPage(Page - 1)
    }


    return ( <div className="genre">
        <Header />
        <div className="home-main">
        <div className="popular">
                
                   
                    <h1> دسته بندی ها</h1>
                
             <div className="sub-list">
            {ok && films.map(genre => (
                <Link href={`/genres/${genre.genreID}`} key={genre.genreID}><a href="#" id="genre-item"> <div className="subscription" id="celebBox">
                <img id="celebProfile" src="/Images/category.png" alt="genre" />
 
                    <h4 id="celeb">{genre.nameOf}</h4>
                    
                
            </div>   </a></Link>

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
 
export default Genres;