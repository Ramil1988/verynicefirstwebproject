import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Tweet from "./Tweet";
import Spinner from "./Spinner";

const TweetDetails = () => {
  const [tweet, setTweet] = useState(null);

  const { tweetId } = useParams();

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setTweet(data);
      });
  }, [tweetId]);

  if (!tweet) {
    return <Spinner />;
  }
  console.log(tweet);

  return (
    <div>
      <Tweet tweetId={tweetId} tweet={tweet["tweet"]} />
    </div>
  );
};

export default TweetDetails;
