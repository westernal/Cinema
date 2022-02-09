import Link from "next/dist/client/link";
import { Puff } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const MoviesList = (props) => {
  
  
    return (   <> 
     {!props && <div className="loader"><Puff color="#1f6cf0" height={100} width={100} /></div>}
      <div className="popular-items">
     
  {props.movies && props.movies.map(movie => { return(
        <Link href={`/movies/${movie.title}/${movie.filmID}`} key={movie.filmID}><a key={movie.filmID}>  <div className="popular-item">
        <img src={movie.posterURL} alt="Popular Movie" id="pop-mov"   />
        <h4>{movie.title}</h4>
        <div className="rating">
            <img src="/Images/star.svg" alt="" />
            <p>{movie.rating}</p>
        </div>
        <p id="moviePrice">{movie.price} تومان</p>
    </div>
    </a>  
    </Link>
  )})}
       
    </div> </>   );
}
 
export default MoviesList;
