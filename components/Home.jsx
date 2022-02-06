import Header from "./Header";
import Navbar from "./Navbar";
import EmblaCarousel from "./EmblaCarousel";
import Footer from "./Footer";
import PWAModal from "./PWAModal";
import MoviesList from "./MoviesList";
import { useState,useEffect } from "react";
import API from "../requests/API"
import Link from "next/dist/client/link";
import { Puff } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const HomePage = () => {

    const [slides,Setslides] = useState();
    const [films,Setfilms] = useState([]);
    const [load,Setload] = useState(false);

    useEffect(() => {
        Setload(true);
       async function getMoviesList() {
        const option = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }

        
        var result = await API(option,"api/film/film/?page=1");
        

        if (result.status == 200) {
            const list = result.data.results.splice(0,5)
            Setload(false);
            Setfilms(list);
           
       } else Setload(false)
    }

    getMoviesList();

    },[])

    useEffect(() => {
        
        let slide = 5;
        
        if (films.length < 5) {
             slide = films.length
        } else  slide = 5;

         Setslides(Array.from(Array(slide).keys()));
       
           if (slides != undefined) {
            if (slides.length > 0) {
                
            
            }
           }
            
        

    },[films])
    
    return ( <div className="home-page">
        <Header />
        <PWAModal />
        {load && <div className="loader"><Puff color="#1f6cf0" height={100} width={100} /></div>}
        <div className="home-main">
            <div className="main-content">
            {slides && slides.length && <EmblaCarousel slides={slides} movies={films}/>}
            <div className="popular">
                <div className="popular-title">
                    <Link href="/movies"><a ><p>مشاهده بیش تر</p></a></Link>
                    <h3>  جدید ترین محصولات</h3>
                </div>
            <MoviesList movies={films}/>
            </div>
            </div>
            <Navbar />
        </div>
        <Footer />
    </div> );
}
 
export default HomePage;