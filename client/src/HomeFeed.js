import { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router";

import Tweet from "./Tweet";
import CreateTweet from "./CreateTweet";
import ErrorScreen from "./ErrorScreen";
import { CurrentUserContext } from "./CurrentUserContext";

const HomeFeed = () => {
  const { tweets, setTweets, reload } = useContext(CurrentUserContext);
  const [error, setError] = useState(false);
  const { tweetId } = useParams();

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
      })
      .catch(() => {
        setError(true);
      });
  }, [reload, tweetId]);

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <>
      <h1>Home</h1>
      <CreateTweet />
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
