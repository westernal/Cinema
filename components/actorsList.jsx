import Link from "next/dist/client/link";

const ActorsList = ({actors}) => {

    return ( <div className="actors-list">
        <h3>بازيگران</h3>
<div className="sub-list ">
    
             {actors.map(actor => ( 
               <Link href="/actors/[id]" as={`/actors/${actor.id}`} key={actor.id}><a > <div className="subscription" id="celebBox">
               <img id="celebProfile" src="/Images/profile.svg" alt="celebrity" />

                   <h4 id="celeb">{actor.name}</h4>
                   
               
           </div></a></Link>
            )
)}
             </div>
    </div> );
}
 
export default ActorsList;