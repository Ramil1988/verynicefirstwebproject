import { useEffect, useState } from "react";

import Tweet from "./Tweet";

const HomeFeed = () => {
  const [tweets, setTweets] = useState();

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
      });
  }, []);

  console.log(tweets);

  return <Tweet></Tweet>;
};

export default HomeFeed;
