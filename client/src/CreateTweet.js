import { useContext, useReducer, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { COLORS } from "./constants";
import Spinner from "./Spinner";

const initialState = {
  loading: false,
};

function tweetReducer(state = initialState, action) {
  switch (action.type) {
    case "SUBMIT_TWEET":
      return { ...state, loading: true };
    case "TWEET_SUBMITTED":
      return { ...state, loading: false };
    default:
      return state;
  }
}

const CreateTweet = (props) => {
  const { tweets, setTweets, setReload } = props;
  const [tweet, setTweet] = useState("");
  const { currentUser } = useContext(CurrentUserContext);
  const [tweetLength, setTweetLength] = useState(0);
  const [state, dispatch] = useReducer(tweetReducer, initialState);

  const handleChange = (e) => {
    setTweet(e.target.value);
    setTweetLength(e.target.value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_TWEET" });
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: tweet }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTweets(tweets ? tweets : data);
        setTweet("");
        setReload((prev) => !prev);
        dispatch({ type: "TWEET_SUBMITTED" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <MainWrapper>
      <CreateTweetWrapper>
        <AvatarWrapper>
          <Avatar src={currentUser["profile"].avatarSrc} alt="user avatar" />
        </AvatarWrapper>
        <TextAreaWrapper>
          <TextArea
            placeholder="What's happening?"
            onChange={handleChange}
            value={tweet}
          />
        </TextAreaWrapper>
      </CreateTweetWrapper>
      <ButtonAndCounterWrapper>
        <TweetLength length={280 - tweetLength}>
          {280 - tweetLength}
        </TweetLength>
        {state.loading ? (
          <Spinner />
        ) : (
          <MeowButton
            onClick={handleSubmit}
            disabled={tweetLength > 280}
            style={{
              backgroundColor: tweetLength > 280 ? "gray" : COLORS.primary,
            }}
          >
            Meow
          </MeowButton>
        )}
      </ButtonAndCounterWrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-top: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  border-bottom: 5px solid gray;
  padding: 15px;
`;

const CreateTweetWrapper = styled.div`
  display: flex;
  height: 150px;
`;

const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
`;

const TextAreaWrapper = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  align-self: flex-start;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80%;
  resize: none;
  border: none;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 20px;
  &:focus {
    outline: none;
    border: none;
  }
`;

const ButtonAndCounterWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;

const TweetLength = styled.p`
  color: ${(props) =>
    props.length > 60 ? "gray" : props.length > 0 ? "yellowgreen" : "red"};
  margin: 20px;
`;

const MeowButton = styled.button`
  text-align: center;
  padding: 10px;
  width: 100px;
  margin: 10px;
  margin-left: auto;
  color: white;
  font-weight: bold;
  font-size: 18px;
  background-color: ${COLORS.primary};
  border-radius: 20px;
  border: none;

  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  &:hover {
    transform: scale(1.2);
  }
`;

export default CreateTweet;
