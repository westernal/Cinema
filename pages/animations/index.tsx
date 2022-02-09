import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MoviesList from "../../components/MoviesList";
import { useState,useEffect } from "react";
import API from "../../requests/API"
import Sort from "../../components/sort";
import Pagination from "../../components/Pagination"


const Animations = () => {

    const [films,Setfilms] = useState([]);
    const [Page,SetPage] = useState(1);
    const [Pd,SetPd] = useState(false);
    const [Nd,SetNd] = useState(false);

    function Next() {
        SetPage(Page + 1)
    }

    function Back() {
        SetPage(Page - 1)
    }

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

        
        var result = await API(option,`api/search/?page=${Page}&search=1&search_fields=isAnimation&order_by=releaseDate_desc`);
        console.log(result);
        if (result.status == 200) {

            if (result.data.count/10 <= Page) {
                SetNd(true)
            } else SetNd(false)
            
            Setfilms(result.data.results);
           
       }
    }

    getMovies();

    },[Page])

    async function sort(e) {
        var result;
 
     const option = {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
         redirect: 'follow'
     }
 
     if (e.target.value == "newest") {
         result = await API(option,`api/search/?page=${Page}&search=1&search_fields=isAnimation&order_by=releaseDate_desc`);
     }
 
     if (e.target.value == "oldest") {
         result = await API(option,`api/search/?page=${Page}&search=1&search_fields=isAnimation&order_by=releaseDate_asc`)
     }
 
     if (e.target.value == "high rating") {
         result = await API(option,`api/search/?page=${Page}&search=1&search_fields=isAnimation&order_by=rating_desc`)
     }
 
     if (e.target.value == "high price") {
         result = await API(option,`api/search/?page=${Page}&search=1&search_fields=isAnimation&order_by=price_desc`)
     }
 
     if (e.target.value == "low price") {
         result = await API(option,`api/search/?page=${Page}&search=1&search_fields=isAnimation&order_by=price_asc`)
     }
     if (result.status == 200) {
 
         if (result.data.count/10 <= Page) {
             SetNd(true)
         } else SetNd(false)
         
         Setfilms(result.data.results);
        
    }
 
 
     }

    
    return ( <div className="animations-page">
        <Header />
        <div className="home-main">
            <div className="main-content">
            <div className="popular">
                
                    <div className="popular-title">
                        <Sort onChange={sort}/>
                    <h1>انیمیشن ها </h1>
                    </div>
            
            <MoviesList movies={films}/>
            </div>
            <Pagination Ndisabled={Nd} Pdisabled={Pd} next={Next} back={Back}/>
            </div>
            <Navbar />
        </div>
        <Footer />
    </div> );
}
 
export default Animations;