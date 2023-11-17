import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("user"))){
      setUser(JSON.parse(localStorage.getItem("user")))
    }
    localStorage.setItem("user",JSON.stringify(user));
  },[user])

  const values = {
    user,
    setUser,
  };

  return <userContext.Provider value={values}>{children}</userContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = ()=>useContext(userContext);
