import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import API from "../requests/API";
import Link from "next/dist/client/link";
import { Puff } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ActorsList from "./actorsList"

const MovieInfo = () => {

    const [movie,Setmovie] = useState([]);
    const [movieIsOK,SetMovieIsOK] = useState(false);
    const [loggedIn,SetLoggedIn] = useState(false);
    const [load,Setload] = useState(false);
    const [isSeries,SetIsSeries] = useState(false);
    const Router = useRouter();
    


    

    useEffect(() => {
        Setload(true);
        

        if ( localStorage.getItem("token") != "" && localStorage.getItem("token") != null ) {
          
            SetLoggedIn(true);
  
          } else {
  
            SetLoggedIn(false);
  
          }

        async function getMoviesList() {
         const option = {
             method: 'GET',
             headers: { 'Content-Type': 'application/json' },
             redirect: 'follow'
         }
         
         var result = await API(option,`api/film/film/${Router.query.id}`);
         console.log(result);
         
         if (result.status == 200) {
            Setload(false);
             Setmovie(result.data);
             if (result.data.typeOf == 2) {
                SetIsSeries(true);
            }
            SetMovieIsOK(true);
        } 
     }
 
     if (Router.query.id) {
         getMoviesList();
     }
     
 
     },[Router.query.id])

    function getInfo(e) {
        e.preventDefault();
        document.querySelector(`.movie-info #one`).style.display = "none";
        document.querySelector(`.movie-info #two`).style.display = "none";
       
        if (!isSeries) {
            document.querySelector(`.movie-info #three`).style.display = "none";
            document.querySelector(`.movies-nav #three`).style.opacity = "0.4";
        }
        document.querySelector(`.movies-nav #one`).style.opacity = "0.4";
        document.querySelector(`.movies-nav #two`).style.opacity = "0.4";
        
        const id = e.target.id;
        e.target.style.opacity = 1;
        document.querySelector(`.movie-info #${id}`).style.display = "flex";
        if (e.target.id == "one") {
            document.querySelector(`.movie-info #${id}`).style.display = "block";
        }
    }

    return (  
         <>
         
         {load && <div className="loader"><Puff color="#1f6cf0" height={100} width={100} /></div>}
         <div className="subscription" id="movieInfo">
     <div className="movies-info">
    
    {movieIsOK && 
        <div className="movies-text">
        <h1>{Router.query.title}</h1>
        <div className="movies-nav">
            <a id="one" href="#" onClick={getInfo}>درباره</a>
            <a id="two" href="#" onClick={getInfo}>خلاصه داستان</a>
           {!isSeries &&  <a id="three" href="#" onClick={getInfo}>کارگردان</a>}
            
        </div>
        <div className="movie-info">
            <div id="one">
                <p>قیمت: {movieIsOK && movie.price} تومان</p>
                <p>مدت زمان: {movieIsOK && movie.duration} دقیقه</p>
                <p>امتیاز: {movieIsOK && movie.rating}</p>
                <p>دسته بندی: {movieIsOK && movie.filmGenre && movie.filmGenre.map(genre => { return( <Link href={`/genres/${genre.id}`} key={genre.id}><a><span > {genre.name} /</span></a></Link>)})}</p>
            </div>
            <div id="two">
                <p id="ltr">{movieIsOK && movie.detailsEn}</p>
            <p>{movieIsOK && movie.detailsFa}</p>
            </div>
            <p id="three">{movieIsOK && movie.filmDirector  && movie.filmDirector.map(director => { return(  <Link href={`/actors/${director.id}`} key={director.id}><a > <div className="subscription" id="celebBox">
               <img id="celebProfile" src="/Images/profile.svg" alt="celebrity" />

                   <h4 id="celeb">{director.name}</h4>
                   
               
           </div></a></Link>)})}</p>
        </div>
        <div className="movies-btns">
        <span><img src="/Images/bookmark.svg" alt="Bookmark logo" /></span>
           {loggedIn && <Link href={`/stream/${Router.query.title}`}><a href=""><button>تماشا</button></a></Link>}
           {!loggedIn && <Link href={`/profile/sign-in`}><a href=""><button>خرید اشتراک</button></a></Link>}
           
        </div>
    </div>}
    <div className="movies-pic">
    {movieIsOK && <img src={movie.posterURL} alt="movie poster"  />}
    </div>
</div> 
</div>
{movieIsOK && <ActorsList actors={movie.filmActor}/>}
</> );
}
 
export default MovieInfo;