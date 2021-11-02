import Link from "next/dist/client/link";

const Navbar = () => {

    function hover(e) {
        
        
        if ( e.target.querySelector('svg path') != null ) {
            e.target.style.opacity = "1";
            e.target.querySelector('svg path').style.fill = "#3984e3";
        } else {
            e.target.style.opacity = "1";
            e.target.style.fill = "#3984e3";
        }
        
        
    }

    function endhover(e) {
        if (e.target.querySelector('p') != null && e.target.querySelector('svg path') != null ) {
            e.target.style.opacity = "0.4";
            e.target.querySelector('svg path').style.fill = "white";
        } else {
            e.target.style.opacity = "0.4";
            e.target.style.fill = "white";
        }
        
        
    }


    return ( <div className="navbar">
        <div className="profile-bar">
        <Link href="/profile/12"><a> 
            <div className="pro-info">
             
                <div className="pro-name">
                    <h4>علی نویدی</h4>
                    <p>09339668289</p>
                </div>
                <div className="pro-pic">
                    <img src="/Images/photo_2021-01-28_21-12-12-removebg-preview (1).jpg" alt="profile picture" />
                </div>
            </div>
            <div className="pro-cash">
                <div className="add-money">
                    +
                </div>
                <div className="acc-money">
                    <p>اعتبار</p>
                    <h4>35000 تومان</h4>
                </div>
                <div className="wallet-logo">
                    <img src="/Images/wallet.svg" alt="wallet logo" />
                </div>
            </div>
            </a></Link>
        </div>
        

          <div className="nav-items">
          <Link href="/"><a >   <div className="nav-item" id="navhome" onMouseEnter={hover} onMouseLeave={endhover}>
                <p>خانه</p>
                <svg id="Layer_1"   version="1.1" viewBox="0 0 24 24"  ><path  d="M21.146,8.576l-7.55-6.135c-0.925-0.751-2.267-0.751-3.192,0c0,0,0,0,0,0L2.855,8.575C2.59,8.79,2.439,9.108,2.439,9.448  v11.543c0,0.62,0.505,1.13,1.125,1.13h5.062c0.62,0,1.125-0.51,1.125-1.13v-7.306h4.499v7.306c0,0.62,0.505,1.13,1.125,1.13h5.062  c0.62,0,1.125-0.51,1.125-1.13V9.448C21.561,9.108,21.41,8.79,21.146,8.576z M20.436,20.997h-5.062V13.68  c0-0.62-0.505-1.119-1.125-1.119H9.75c-0.62,0-1.125,0.499-1.125,1.119v7.317H3.564V9.448l7.55-6.134  c0.513-0.418,1.26-0.417,1.773,0l7.55,6.134V20.997z"/></svg>
            </div>
            </a>
            </Link>
            <Link href="/bookmarks"><a > <div className="nav-item" id="navbook" onMouseEnter={hover} onMouseLeave={endhover}>
                <p>لیست تماشا</p>
                <svg id="Layer_1"  version="1.1" viewBox="0 0 48 48" ><g><path d="M38,46.9l-14-9.7l-14,9.7V5c0-1.7,1.3-3,3-3h22c1.7,0,3,1.3,3,3V46.9z M24,34.8l12,8.3V5c0-0.6-0.4-1-1-1H13   c-0.6,0-1,0.4-1,1v38.1L24,34.8z"/></g></svg>
            </div>
            </a>
            </Link>
            <div className="logout" >
                <p>خروج از حساب</p>
                <svg id="Outlined" viewBox="0 0 32 32" ><title/><g id="Fill"><path d="M25,2H16V4h9a1,1,0,0,1,1,1V27a1,1,0,0,1-1,1H16v2h9a3,3,0,0,0,3-3V5A3,3,0,0,0,25,2Z"/><path d="M21.58,17V15H7l4-4L9.58,9.55l-5,5a2,2,0,0,0,0,2.83l5,5L11,21,7,17Z"/></g></svg>
            </div>
        </div>
    </div> );
}
 
export default Navbar;