import { useEffect, useState } from "react";

const Tweet = () => {
  const [tweets, setTweets] = useState();

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
      });
  }, []);

  console.log(tweets);

  return <h1>{tweets?.tweetsById["1209788222324256768"].status}</h1>;
};

export default Tweet;
