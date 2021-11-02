import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MoviesList from "../../components/MoviesList";
import Navbar from "../../components/Navbar";

const Bookmark = () => {
    return ( <div className="bookmark">
        <Header />
        <div className="home-main">
        <div className="popular">
                <div className="popular-title">
                   
                    <h3>  لیست تماشا</h3>
                </div>
             <MoviesList />
            </div>
            <Navbar />
            </div>
            <Footer />
    </div> );
}
 
export default Bookmark;