import Header from "./Header";
import Navbar from "./Navbar";
import EmblaCarousel from "./EmblaCarousel";
import Footer from "./Footer";
import PWAModal from "./PWAModal";
import MoviesList from "./MoviesList";


const HomePage = () => {


  
    const SLIDE_COUNT = 5;
    const slides = Array.from(Array(SLIDE_COUNT).keys());
    
    return ( <div className="home-page">
        <Header />
        <PWAModal />
        <div className="home-main">
            <div className="main-content">
            <EmblaCarousel slides={slides} />
            <div className="popular">
                <div className="popular-title">
                    <p>مشاهده بیش تر</p>
                    <h3>فیلم های محبوب</h3>
                </div>
            <MoviesList />
            </div>
            </div>
            <Navbar />
        </div>
        <Footer />
    </div> );
}
 
export default HomePage;