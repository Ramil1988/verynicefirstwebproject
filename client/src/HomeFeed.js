import { useEffect, useState } from "react";

import Tweet from "./Tweet";
import CreateTweet from "./CreateTweet";
import ErrorScreen from "./ErrorScreen";

const HomeFeed = () => {
  const [tweets, setTweets] = useState();
  const [reload, setReload] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
      })
      .catch(() => {
        setError(true);
      });
  }, [reload]);

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <>
      <h1>Home</h1>
      <CreateTweet
        tweets={tweets}
        setTweets={setTweets}
        setReload={setReload}
      />
      <div>
        {tweets &&
          tweets.tweetIds.map((tweetId) => (
            <Tweet
              key={tweetId}
              tweetId={tweetId}
              tweet={tweets.tweetsById[tweetId]}
            />
          ))}
      </div>
    </>
  );
};
export default HomeFeed;
