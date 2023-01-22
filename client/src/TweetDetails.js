import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Tweet from "./Tweet";
import Spinner from "./Spinner";
import ErrorScreen from "./ErrorScreen";

const TweetDetails = () => {
  const [tweet, setTweet] = useState(null);
  const { tweetId } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setTweet(data);
      })
      .catch(() => {
        setError(true);
      });
  }, [tweetId]);

  if (!tweet) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <div>
      <Tweet tweetId={tweetId} tweet={tweet["tweet"]} />
    </div>
  );
};

export default TweetDetails;
