import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocFromAuth} from "../utils/firebase/firebase.utils";


export const UserContext = createContext({
    currentUser: null,
    SetcurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, SetcurrentUser] = useState(null);
    const value = { currentUser, SetcurrentUser };


    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) =>{
            if(user){
                 createUserDocFromAuth(user)
            }
            SetcurrentUser(user);
            
        });
        return unsubscribe
    }, [])


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}