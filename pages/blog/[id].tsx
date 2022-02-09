import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import API from "../../requests/API";
import { useRouter } from "next/router";
import { Puff } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const Post = () => {

    const router = useRouter()
    const [load,Setload] = useState(false);
    const [gotPost,SetgotPost] = useState(false);
    const [post,SetPost] = useState({title: "", postID: 0,dateOf: "", textOf: "" });
    

    useEffect(() => {
        SetgotPost(false)

        async function getSub() {
         const option = {
             method: 'GET',
             headers: { 'Content-Type': 'application/json' },
             redirect: 'follow'
         }
 
         
         var result = await API(option,`api/post/${router.query.id}`);
         console.log(result);
 
         if (result.status == 200) {
          SetPost(result.data);
          SetgotPost(true)
        }
     }

    getSub();

    },[router.query])

    

  
    
   
    return ( <div className="sub-page">
        <Header />
        <div className="sub-header">
        {gotPost && 
                <div className="subscription" key={post.postID}>
                    <img src="/Images/f69a9ac1bc97733c047691160827b213.jpg" alt="subscription" />
                    <div className="sub-info">
                        <h2>{post.title}</h2>
                        <h3>{post.dateOf}</h3>
                    </div>
                    <p id="post-text">{post.textOf}</p>
                </div>
            
}
    
    
</div>
       
            <Footer />

    </div> );
}
 
export default Post;