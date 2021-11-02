import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Link from "next/dist/client/link";
import MoviesList from "../../components/MoviesList";

const Movies = () => {
    const Router = useRouter();
    return ( <div className="movies-page">
        <Header />
        <img src="/Images/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_.jpg" alt="movie poster" id="movie-background" />
        <div className="movies-info">
            <div className="movies-text">
                <h1>{Router.query.title}</h1>
                <div className="movies-nav">
                    <p>درباره</p>
                    <p>خلاصه داستان</p>
                    <p>کارگردان</p>
                    <p>بازیگران</p>
                </div>
                <div className="movies-btns">
                <span><img src="/Images/bookmark.svg" alt="Bookmark logo" /></span>
                    <button>تماشا</button>
                   
                </div>
            </div>
            <div className="movies-pic">
            <img src="/Images/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_.jpg" alt="movie poster"  />
            </div>
        </div>
        <div className="popular">
                <div className="popular-title">
                   
                    <h3>فیلم های مشابه</h3>
                </div>
               <MoviesList />
            </div>
            <Footer />

    </div> );
}
 
export default Movies;