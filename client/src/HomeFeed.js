import { useEffect, useState } from "react";

import Tweet from "./Tweet";
import CreateTweet from "./CreateTweet";

const HomeFeed = () => {
  const [tweets, setTweets] = useState();

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
      });
  }, [tweets]);

  return (
    <>
      <h1>Home</h1>
      <CreateTweet tweets={tweets} setTweets={setTweets} />
      <div>
        {tweets &&
          Object.entries(tweets.tweetsById).map(([tweetId, tweetData]) => (
            <Tweet key={tweetId} tweet={tweetData} />
          ))}
      </div>
    </>
  );
};
export default HomeFeed;

{
  /* <Tweet tweet={tweet} key={tweet.id} /> */
}
