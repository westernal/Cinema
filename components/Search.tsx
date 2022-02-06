import { useRouter } from "next/router";


const Search =  () => {
    const Router = useRouter();
    let word: string;

    function isTyping(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            word = e.target.value;
            document.getElementById("searchBtn").click();
        }
    }

    async function search() {
      word = (document.getElementById("searchInp") as HTMLInputElement).value;
      Router.push(`/search/${word}`)
    }

    

    return ( 
        <div className="search">
        <input type="text" placeholder="جستجو" onKeyUp={isTyping} id="searchInp"/> <img src="/Images/search.svg" alt="search" id="searchBtn" onClick={search}/>
    </div>
     );
}
 
export default Search;