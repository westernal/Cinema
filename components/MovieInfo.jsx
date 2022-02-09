import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import API from "../requests/API";
import Link from "next/dist/client/link";
import { Puff } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ActorsList from "./ActorsList"

const MovieInfo = ({movie}) => {

    
    const [hasSub,SetHasSub] = useState(false);
    const [movieIsOK,SetMovieIsOK] = useState(false)
    const [load,Setload] = useState(false);
    const [isSeries,SetIsSeries] = useState(false);
    const [fail,SetFail] = useState(false);
    const [success,Setsuccess] = useState(false)
    const Router = useRouter();
    


    

    useEffect(() => {
        Setload(true);
        
        var subscribed = localStorage.getItem("sub");
        if ( subscribed !== "none" &&  subscribed !== "undefined" ) {
          
            SetHasSub(true);
  
          } else {
  
            SetHasSub(false);
  
          }

       
 
     if (movie.rating != undefined) {
        SetMovieIsOK(true);
        Setload(false)
        if (movie.typeOf == 2) {
            SetIsSeries(true);
        }
       

        if (movie.user_purchased) {
            SetHasSub(true);
        }
     }
     
 
     },[movie])

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

    async function buyFilm(e) {
        
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('token')}` },
            body: JSON.stringify({
                film: movie.filmID
            }),
            redirect: 'follow'
        }
    
        
        console.log(option);
            
            var response = await fetch("https://rest.amdeveloper.xyz/api/film/film/buy/",option);
           
    
            const data = await response.text();
           
           
    
            if (response.status == 201) {
                SetFail(false)
                SetHasSub(true)
                Setsuccess(true)
            } else {
                SetFail(true)
                Setsuccess(false)
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
            <div id="three">{movieIsOK && movie.filmDirector  && movie.filmDirector.map(director => { return(  <Link href={`/actors/${director.id}`} key={director.id}><a > <div className="subscription" id="celebBox">
               <img id="celebProfile" src="/Images/profile.svg" alt="celebrity" />

                   <h4 id="celeb">{director.name}</h4>
                   
               
           </div></a></Link>)})}</div>
        </div>
        {fail && <p id="fail">اعتبار حساب شما كافي نيست.</p>}
        {success && <p id="success">فیلم مورد نظر با موفقيت خريداري شد.</p>}
        <div className="movies-btns">
           {hasSub  && <Link href={`/stream/${Router.query.title}`}><a href=""><button>تماشا</button></a></Link>}
           {!hasSub && <Link href={`/subscription`}><a href=""><button>خرید اشتراک</button></a></Link>}
           { !hasSub && <button id="buyMovie" onClick={buyFilm}>خرید فیلم</button>}
           
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