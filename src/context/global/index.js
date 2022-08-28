import { createContext } from "react";
import { useState } from "react";

export const GlobalContext = createContext({})

export const GlobalProvider = ({children}) => {

    const [musica, setMusica] = useState(1);


    return (
        <GlobalContext.Provider value={{musica, setMusica}}>{children}</GlobalContext.Provider>
    )

} 