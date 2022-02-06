import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MoviesList from "../../components/MoviesList";
import { useState,useEffect } from "react";
import API from "../../requests/API"
import Pagination from "../../components/Pagination"


const Series = () => {

    const [films,Setfilms] = useState([]);
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

        
        var result = await API(option,`api/search/?page=${Page}&search=2&search_fields=typeOf`);

        if (result.status == 200) {

            if (result.data.count/10 <= Page) {
                SetNd(true)
            } else SetNd(false)
            
            Setfilms(result.data.results);
           
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

    
    return ( <div className="series-page">
        <Header />
        <div className="home-main">
            <div className="main-content">
            <div className="popular">
                
                    <h1>سریال ها </h1>
            
            <MoviesList movies={films}/>
            </div>
            <Pagination Ndisabled={Nd} Pdisabled={Pd} next={Next} back={Back}/>
            </div>
            <Navbar />
        </div>
        <Footer />
    </div> );
}
 
export default Series;