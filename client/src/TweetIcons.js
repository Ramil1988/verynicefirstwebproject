import styled from "styled-components";
import { useEffect, useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

import {
  FaRegComment,
  FaRetweet,
  FaHeart,
  FaRegHeart,
  FaUpload,
} from "react-icons/fa";

const TweetIcons = ({ tweet, tweetId, setTweet }) => {
  const { reload, setReload } = useContext(CurrentUserContext);

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setTweet(data);
      })
      .catch(() => {});
  }, [reload]);

  const handleClick = (e) => {
    e.preventDefault();
    fetch(`/api/tweet/${tweetId}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: !tweet.isLiked }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setReload(!reload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <IconsWrapper>
      <Button>
        <FaRegComment />
      </Button>
      <Button>
        <FaRetweet />
      </Button>
      <Button onClick={handleClick}>
        <Wrapper>
          {tweet.isLiked ? (
            <InnerWrapper>
              <FaHeart color="red" />
              <TimesClick>{tweet.numLikes}</TimesClick>
            </InnerWrapper>
          ) : (
            <FaRegHeart color="black" />
          )}
        </Wrapper>
      </Button>
      <Button>
        <FaUpload />
      </Button>
    </IconsWrapper>
  );
};

const IconsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InnerWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  font-size: 30px;

  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const TimesClick = styled.p`
  color: gray;
  font-size: 25px;
  padding-left: 40px;
  position: absolute;
`;

export default TweetIcons;
