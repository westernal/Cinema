import Link from "next/dist/client/link";

const EditProfile = (props) => {
    return (     <div className="edit-profile">
   <Link href="/profile/edit"><a ><div className="edit-info">
        <div className="ei-img">
            <img src="/Images/setting.svg" alt="setting" />
        </div>
        <p>ویرایش پروفایل</p>
    </div></a></Link> 
    <Link href={`/profile/${props.id}/pay`}><a href=""><div className="add-cart">
    <div className="ei-img">
            <h1>+</h1>
        </div>
        <p>افزودن به حساب</p>
    </div></a></Link>
    <Link href={`/subscription`}><a href=""><div className="subscribe">
    <div className="ei-img">
            <img src="/Images/subscription.svg" alt="subscribe" />
        </div>
        <p>خرید اشتراک</p>
    </div></a></Link>

</div> );
}
 
export default EditProfile;