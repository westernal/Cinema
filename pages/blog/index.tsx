import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MoviesList from "../../components/MoviesList";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import API from "../../requests/API";

const Blog = () => {

    const [posts,SetPosts] = useState([]);
    const [gotPosts,SetgotPosts] = useState(false);
   

    useEffect(() => {

        SetgotPosts(false)

       async function getPosts() {
        const option = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }

        
        var result = await API(option,`api/post/`);
        

        if (result.status == 200) {
         SetPosts(result.data.results);
         SetgotPosts(true)
       }
    }

    getPosts();

    },[])

    


    return ( <div className="blog">
        <Header />
        <div className="home-main">
        <div className="popular">
                
                   
                    <h1> بلاگ</h1>
                
             <div className="sub-list">
            {gotPosts && posts.map(post => ( 
               <Link href={`/blog/${post.postID}`} key={post.postID}><a >
                    <div className="subscription" >
                    <img src="/Images/f69a9ac1bc97733c047691160827b213.jpg" alt="Post" />
                    <div className="sub-info">
                        <h2>{post.title}</h2>
                        <h3>{post.dateOf}</h3>
                    </div>
                </div></a></Link>
            )
)}
             </div>
             
            </div>
            <Navbar />
            </div>
            <Footer />
    </div> );
}
 
export default Blog;