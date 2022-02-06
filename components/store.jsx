import React from "react";
import { useState } from "react";

export const Context = React.createContext();

const Store = ({children}) => {
    const [state, Setstate] = useState([]); 
    return ( 
        <Context.Provider value={[state, Setstate]}>{children}</Context.Provider>
     );
}
 
export default Store;