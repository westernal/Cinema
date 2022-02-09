import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Stream = () => {
    const Router = useRouter();
    const [word,Setword] = useState("");
    const [ok,Setok] = useState(false);


    useEffect(() => {
        Setword(Router.query.title);
        if (word != "" && word != undefined) {
            Setok(true);
        }
    })


    return ( 
    <div className="stream">
      <video  controls>
  {ok && <source src={`http://195.248.241.84:8080/video/${word}`} type="video/mp4"/>}
  
        Your browser does not support the video tag.
</video>
    </div> 
    );
}
 
export default Stream;