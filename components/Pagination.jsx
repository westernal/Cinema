import { useEffect } from "react";

function Pagination ({Ndisabled,Pdisabled,back,next}) {

    useEffect(() => {
        if (Ndisabled) {

          document.getElementById("next-btn").style.opacity = 0.4  

        } else document.getElementById("next-btn").style.opacity = 1

        if (Pdisabled) {

            document.getElementById("back-btn").style.opacity = 0.4  
           
        } else document.getElementById("back-btn").style.opacity = 1 

    },[Ndisabled,Pdisabled])

    function Next(e) {
        e.preventDefault()

        if (!Ndisabled) {
            next();
        }
    }

    function Back(e) {
        e.preventDefault()

        if (!Pdisabled) {
            back();
        }
    }
    
  
    return (
        <div className="pagination">
            <a className="pag-btn" id="back-btn" href="#" onClick={Back}>صفحه قبل</a>
            <a className="pag-btn" id="next-btn" href="#" onClick={Next}>صفحه بعد</a>
        </div>
    );
  }

 export default Pagination; 