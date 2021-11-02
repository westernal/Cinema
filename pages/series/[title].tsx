import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MoviesList from "../../components/MoviesList";
import MovieInfo from "../../components/MovieInfo";

const Serie = () => {
    const Router = useRouter();
    return ( <div className="movies-page">
        <Header />
        
        <MovieInfo />
        <div className="popular">
                <div className="popular-title">
                   
                    <h3>سریال های مشابه</h3>
                </div>
              <MoviesList />
            </div>
<Footer/>
    </div> );
}
 
export default Serie;