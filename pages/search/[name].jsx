import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MoviesList from "../../components/MoviesList";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import API from "../../requests/API";
import Pagination from "../../components/Pagination"

const Search = () => {
    const Router = useRouter();
    const [res,Setres] = useState([]);
    const [Page,SetPage] = useState(1);
    const [Pd,SetPd] = useState(false);
    const [Nd,SetNd] = useState(false);

    useEffect(() => {

        if (Page == 1) {
            SetPd(true)
        } else SetPd(false)
       
       async function search() {

        const option = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }

        var result = await API(option,`api/search/?page=${Page}&search=${Router.query.name}&search_fields=title`);
       

        if (result.status == 200) {
            if (result.data.count/10 <= Page) {
                SetNd(true)
            } else SetNd(false)
            
            Setres(result.data.results);
           
       }
            
        }

        if (Router.query.name) {
            search();
        }
    
        },[Router.query.name,Page])

        function Next() {
            SetPage(Page + 1)
        }
    
        function Back() {
            SetPage(Page - 1)
        }

    return (
         <div className="searchPage" id="searchPage">
        <Header />
        <div className="home-main">
        <div className="popular">
                <div className="popular-title">
                   
                    <h3>  نمایش نتیجه: {Router.query.name}</h3>
                </div>
             <MoviesList movies={res}/>
             <Pagination Ndisabled={Nd} Pdisabled={Pd} next={Next} back={Back}/>
            </div>
            
            <Navbar />
            </div>
            <Footer />
    </div>
     );
}
 
export default Search;