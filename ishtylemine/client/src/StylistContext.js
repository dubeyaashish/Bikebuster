import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StylistContext = createContext({});

export function StylistContextProvider({children}) {
    const [stylist,setStylist] = useState(null);
    const [ready,setReady] =useState(false);
    useEffect(() => {
      console.log("Fetching stylist profile...");
      axios.get('/stylistprofile').then(({data}) => {
        console.log("Received stylist profile data:", data);
        setStylist(data);
        setReady(true);
      }).catch((error) => {
        console.error("Error fetching stylist profile:", error);
        setReady(true);
      });
    }, []);
    
    return(
        <StylistContext.Provider value={{stylist, setStylist, ready}}>
            {children}
        </StylistContext.Provider>

    );
}