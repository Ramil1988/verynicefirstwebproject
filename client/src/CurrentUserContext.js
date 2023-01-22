import { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext({
  currentUser: null,
  status: "loading",
});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [status, setStatus] = useState("loading");
  const [tweets, setTweets] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        setStatus("idle");
      });
  }, []);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
      });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, status, tweets, setTweets, reload, setReload }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
