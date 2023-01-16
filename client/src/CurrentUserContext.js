import { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext({
  currentUser: null,
  status: "loading",
});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        setStatus("idle");
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, status }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
