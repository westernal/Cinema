import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MoviesList from "../../components/MoviesList";
import { useState,useEffect } from "react";
import Pagination from "../../components/Pagination"
import API from "../../requests/API"


const Bookmarks = () => {

    const [films,Setfilms] = useState([]);
    const [Page,SetPage] = useState(1);
    const [Pd,SetPd] = useState(false);
    const [Nd,SetNd] = useState(false);

    useEffect(() => {

        if (Page == 1) {
            SetPd(true)
        }


       async function getMovies() {
        const option = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('token')}` },
            redirect: 'follow'
        }

        
        var result = await API(option,`api/user/films`);
        

        if (result.status == 200) {

            if (result.data.count/10 <= Page) {
                SetNd(true)
            } else SetNd(false)
            
            Setfilms(result.data.results[0].myFilms);
           
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

    
    return ( <div className="bookmarks-page">
        <Header />
        <div className="home-main">
            <div className="main-content">
            <div className="popular">
                
                    <h1>  فیلم های من </h1>
            
            <MoviesList movies={films}/>
            </div>
            <Pagination Ndisabled={Nd} Pdisabled={Pd} next={Next} back={Back}/>
            </div>
            <Navbar />
        </div>
        <Footer />
    </div> );
}
 
export default Bookmarks;