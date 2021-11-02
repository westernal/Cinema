import share1 from "../public/Images/Frame 85.svg"
import share2 from "../public/Images/Frame 85 (1).svg"
import share3 from "../public/Images/Frame 86.svg"
import { useEffect } from 'react'


const PWAModal = () => {
    useEffect(() => {


        var x = window.matchMedia("(max-width: 922px)")
        var value = localStorage.getItem("modal")
        if (x.matches && value == null) {
           document.getElementById("myModal").style.display = "block"
      
        }
              var modal = document.getElementById("myModal");
      
      
              
              var span = document.getElementsByClassName("close1")[0];
              
              if (modal != null) {
              
                
            
              
              
              span.addEventListener("click",function() {
                modal.style.display = "none";
                localStorage.setItem('modal',"close");
              });
              
              
              window.onclick = function(event) {
                if (event.target == modal) {
                  modal.style.display = "none";
                }
              }
          }
      
    },[])
    return (    <div id="myModal" className="modal">

    <div className="modal-content">
      
      <div className="modal-main">
    
    
     <h3>وب اپلیکیشن سینما را به صفحه اصلی اضافه کنید و به راحتی از امکانات آن استفاده کنید </h3>
     <div className="share-info">
         <div className="si1"><p>در نوار پایین روی دکمه Share بزنید.</p><img src={share1.src} /></div>
         <div className="si1"><p> در ﻣﻨﻮی ﺑﺎز ﺷﺪه در ﻗﺴﻤﺖ ﭘﺎﯾﯿﻦ ﺻﻔﺤﻪ، ﮔﺰﯾﻨﻪ Add To Home Screen را انتخاب کنید.</p><img src={share2.src}/></div>
         <div className="si1"><p>در مرحله بعد در قسمت بالا روی Add بزنید. </p><img src={share3.src} /> </div>
     </div>
     <div className="mm-btn"><button className="close1">متوجه شدم</button>  </div>
     
    
    
    
    </div>
    </div>
    </div> );
}
 
export default PWAModal;