import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);
    const [ready,setReady] =useState(false);
    useEffect(() => {
      console.log("Fetching user profile...");
      axios.get('/profile').then(({data}) => {
        console.log("Received user profile data:", data);
        setUser(data);
        setReady(true);
      }).catch((error) => {
        console.error("Error fetching user profile:", error);
        setReady(true);
      });
    }, []);
    
    return(
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>

    );
}