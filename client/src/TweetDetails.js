import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Tweet from "./Tweet";
import Spinner from "./Spinner";
import ErrorScreen from "./ErrorScreen";
import styled from "styled-components";

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

  console.log(tweet)

  return (
    <Wrapper>
      <Tweet tweetId={tweetId} tweet={tweet["tweet"]} setTweet={setTweet} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
margin-top: 20px;

`

export default TweetDetails;
