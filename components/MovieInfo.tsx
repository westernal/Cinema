import { useRouter } from "next/router";

const MovieInfo = () => {
    const Router = useRouter();
    return (  
         <>
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
</> );
}
 
export default MovieInfo;