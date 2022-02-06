import { useEffect, useState } from "react";

const ProfileInfo = (props) => {
    const [sub,Setsub] = useState(false);

    useEffect(() => {
        if (props.user.current_subscription !== "none" && props.user.current_subscription != undefined) {
            
            Setsub(true);
        }
    },[props.user])

    
    return (   
        <>
          <div className="profile-header">
    <div className="profile-pic">
        <img src="/Images/photo_2021-01-28_21-12-12-removebg-preview (1).jpg" alt="profile picture" />
    </div>
    <h1> {props.user.name}</h1>
    <h3>@{props.user.username}</h3>
</div>
<div className="profile-info">
    <div className="pi1">
        <p>{props.user.email}</p>
        <p id="pi"> ایمیل </p>
    </div>
    <div className="pi1">
        <p>{props.user.balance} تومان</p>
        <p id="pi"> اعتبار</p>
    </div>
    <div className="pi1">
        {sub ? <p>{props.user.current_subscription.nameOf}</p> : <p>ندارید</p>}
        <p id="pi"> وضعیت اشتراک</p>
    </div>
</div> 
</>);
}
 
export default ProfileInfo;