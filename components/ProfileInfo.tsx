const ProfileInfo = () => {
    return (   
        <>
          <div className="profile-header">
    <div className="profile-pic">
        <img src="/Images/photo_2021-01-28_21-12-12-removebg-preview (1).jpg" alt="profile picture" />
    </div>
    <h1>علی نویدی</h1>
</div>
<div className="profile-info">
    <div className="pi1">
        <p>09339668289</p>
        <p id="pi"> شماره تماس</p>
    </div>
    <div className="pi1">
        <p>35,000 تومان</p>
        <p id="pi"> اعتبار</p>
    </div>
    <div className="pi1">
        <p>ندارید</p>
        <p id="pi"> وضعیت اشتراک</p>
    </div>
</div> 
</>);
}
 
export default ProfileInfo;