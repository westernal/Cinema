import { useRouter } from "next/router";
import EditProfile from "../../../components/EditProfile";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import MoviesList from "../../../components/MoviesList";
import ProfileInfo from "../../../components/ProfileInfo";
import { useState } from "react";
import { useEffect } from "react";
import API from "../../../requests/API";

const Profile = () => {
    const Router = useRouter();
    const [user,Setuser] = useState({userID : 0})

    useEffect(() => {

        async function userInfo() {
            const option = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}` },
                redirect: 'follow'
            }
    
            
            
            var result = await API(option,"api/user/info/");
            
            
            if (result.status == 200) {
                Setuser(result.data.results[0])
                
            } 
        }

        if ( localStorage.getItem("token") != "" && localStorage.getItem("token") != null ) {
        userInfo();
        } else Router.push("/");
    },[])

    const [films,Setfilms] = useState([]);
    

    useEffect(() => {
       async function getMovies() {
        const option = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }

        
        var result = await API(option,"api/film/film/?page=1");
        

        if (result.status == 200) {
            
            Setfilms(result.data.results);
           
       }
    }

    getMovies();

    },[])
    return ( <div className="profile-page">
        <Header />

        <ProfileInfo user={user}/>

        <EditProfile id={user.userID}/>
    
        <div className="popular">
                <div className="popular-title">
                   
                    <h3>  فیلم های دیده شده </h3>
                </div>

               <MoviesList movies={films}/>
              
            </div>

        <Footer />
        
    </div> );
}
 
export default Profile;