import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Puff } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import API from "../requests/API";
import { useEffect } from "react";
import { useRouter } from "next/router";


const Comments = ({filmID,movie,refresh}) => {

    const route = useRouter()
    const [rating, Setrating] = useState(0)
    const [fail,Setfail] = useState(false);
    const [load,Setload] = useState(false);
    const [success,Setsuccess] = useState(false);
    const [commented,Setcommented] = useState(false)
    const [reviews,Setreviews] = useState([])
    const [userReview,SetuserReview] = useState([])


    useEffect(() => {
        
        if (movie.rating != undefined) {
         
            Setreviews(movie.reviews)
          
            if (movie.user_reviewed) {
                const review = movie.reviews.filter(review => review.reviewID == movie.user_review_id)
                SetuserReview(review)
                Setcommented(true);
              
            } else Setcommented(false)
           

         }
    },[movie,route.query])

    function ratingChanged(newRating) {
        Setrating(newRating)
    }

    async function submitComment() {
        Setsuccess(false);
        Setload(true);
        Setfail(false);
        const text = document.getElementById("comment-text").value

        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('token')}` },
            body: JSON.stringify({
                textOf: text,
                film: filmID,
                rating: rating
            }),
            redirect: 'follow'
        }

        var result = await API(option,"api/film/review/");

        
        

        if (result.status == 201) {
            Setload(false);
            Setsuccess(true);
            refresh();
           } else { Setload(false) ,Setfail(true) }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    async function editComment() {
        Setsuccess(false);
        Setload(true);
        Setfail(false);
        const text = document.getElementById("comment-text").value

        const option = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('token')}` },
            body: JSON.stringify({
                textOf: text,
                rating: rating
            }),
            redirect: 'follow'
        }
       
        var response = await fetch(`https://rest.amdeveloper.xyz/api/film/review/${userReview[0].reviewID}/`,option);
       

        const data = await response.text();
        
       

        if (response.status == 200) {
            Setload(false);
            Setsuccess(true);
            refresh();
           await sleep(2000)
           Setsuccess(false)
          

           } else { Setload(false) ,Setfail(true) }
    }

    return ( <div className="comment-section">
        <h3>دیدگاه های کاربران</h3>
        <div className="post-comment">
        <div className="cm-rating">
            
          {!commented ?  <ReactStars 
        count={10}
        size={24}
        onChange={ratingChanged}
        /> : <ReactStars 
        count={10}
        size={24}
        value={userReview[0].rating}
        onChange={ratingChanged}
        /> 
        }
        <p>امتیاز شما به این فیلم:</p>
        </div>
            <div className="cm-inputs">
            {!commented ? <textarea  placeholder="متن دیدگاه... " id="comment-text"/> : <textarea  placeholder={userReview[0].textOf} id="comment-text"/>}
            {load && <div className="loader"><Puff color="#1f6cf0" height={40} width={40} /></div>}
            {fail && <p id="fail">شما قبلا نظر داده اید.</p>}
                {success && <p id="success">دیدگاه شما با موفقيت ثبت شد.</p>}
            {!commented ? <button onClick={submitComment}>ثبت دیدگاه</button> : <button onClick={editComment}>ویرایش دیدگاه</button>}
            </div>
        </div>
        <div className="comments-list">
        {reviews.map(review => (
            <div className="review" key={review.reviewID}>
                <div className="review-profile">
                <img src="/Images/photo_2021-01-28_21-12-12-removebg-preview (1).jpg" alt="profile picture" />
                <h4>{review.user.username}</h4>
                <div className="rating">
            <img src="/Images/star.svg" alt="rating" />
            <p>{review.rating}</p>
        </div>
                </div>
                <p>{review.textOf}</p>
            </div>
        ))}
        </div>
    </div> );
}
 
export default Comments;