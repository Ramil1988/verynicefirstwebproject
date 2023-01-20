import { useEffect, useState } from "react";

import Tweet from "./Tweet";
import CreateTweet from "./CreateTweet";

const HomeFeed = () => {
  const [tweets, setTweets] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
      });
  }, [reload]);

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
            <Tweet key={tweetId} tweet={tweets.tweetsById[tweetId]} />
          ))}
      </div>
    </>
  );
};
export default HomeFeed;

{
  /* <Tweet tweet={tweet} key={tweet.id} /> */
}
