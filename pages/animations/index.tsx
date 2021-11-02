import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import EmblaCarousel from "../../components/EmblaCarousel";
import Footer from "../../components/Footer";
import MoviesList from "../../components/MoviesList";

const Animations = () => {

    const SLIDE_COUNT = 5;
    const slides = Array.from(Array(SLIDE_COUNT).keys());
    return ( <div className="animations-page">
         <Header />
        <div className="home-main">
            <div className="main-content">
            <EmblaCarousel slides={slides} />
            <div className="popular">
                <div className="popular-title">
                    <p>مشاهده بیش تر</p>
                    <h3>انیمیشن های محبوب</h3>
                </div>
              <MoviesList />
            </div>
            </div>
            <Navbar />
        </div>
        <Footer />
    </div> );
}
 
export default Animations;