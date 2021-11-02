import { useRouter } from "next/router";
import EditProfile from "../../components/EditProfile";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MoviesList from "../../components/MoviesList";
import ProfileInfo from "../../components/ProfileInfo";

const Profile = () => {
    const Router = useRouter();
    return ( <div className="profile-page">
        <Header />

        <ProfileInfo />

        <EditProfile />
    
        <div className="popular">
                <div className="popular-title">
                   
                    <h3>  فیلم های دیده شده </h3>
                </div>

               <MoviesList />
              
            </div>

        <Footer />
        
    </div> );
}
 
export default Profile;