import { Dialog } from "@material-ui/core";
import { useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { useReducer } from "react";
import { COLORS } from "./constants";
import Loading from "./Spinner";

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

const TweetDialog = (props) => {
  const { currentUser, tweets, setTweets, reload, setReload } =
    useContext(CurrentUserContext);
  const { open, onClose } = props;
  const [tweet, setTweet] = useState("");
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
        onClose();
        dispatch({ type: "TWEET_SUBMITTED" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <TweetDialogWrapper>
      <Dialog open={open} onClose={onClose}>
        <AvatarWrapper>
          <Avatar src={currentUser["profile"].avatarSrc} alt="user avatar" />
          <p>Everyone ↓</p>
        </AvatarWrapper>
        <DialogContent>
          <TextFieldWrapper
            multiline
            variant="outlined"
            fullWidth
            value={tweet}
            onChange={handleChange}
            placeholder="What's happening?"
          />
          <ButtonAndCounterWrapper>
            <TweetLength length={280 - tweetLength}>
              {280 - tweetLength}
            </TweetLength>
            {state.loading ? (
              <Loading />
            ) : (
              <PostTweetButton
                onClick={handleSubmit}
                disabled={tweetLength > 280}
                style={{
                  backgroundColor: tweetLength > 280 ? "gray" : COLORS.primary,
                }}
              >
                Meow
              </PostTweetButton>
            )}
          </ButtonAndCounterWrapper>
        </DialogContent>
      </Dialog>
    </TweetDialogWrapper>
  );
};

const TweetDialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvatarWrapper = styled.div`
  border-radius: 50%;
  margin-top: 30px;
  margin-left: 20px;
  display: flex;

  & p {
    color: black;
    margin-left: 15px;
    border: 2px solid black;
    padding: 4px;
    border-radius: 5px;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  align-self: flex-start;
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const TextFieldWrapper = styled.textarea`
  padding: 100px;
  width: 500px;
  height: 150px;
  resize: none;
  border: none;
  margin-bottom: 10px;
  padding: 20px;
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

const PostTweetButton = styled.button`
  background-color: ${COLORS.primary};
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 100px;
  border: none;
  outline: none;
  margin: 12px;
  margin-left: auto;
  align-self: flex-end;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  &:hover {
    transform: scale(1.2);
  }
`;

export default TweetDialog;
