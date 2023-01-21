import styled from "styled-components";
import { useState, useEffect } from "react";

import {
  FaRegComment,
  FaRetweet,
  FaHeart,
  FaRegHeart,
  FaUpload,
} from "react-icons/fa";

const TweetIcons = ({ tweet }) => {
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [tweets, setTweets] = useState();

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
      });
  }, [clicked]);

  const handleClick = (e) => {
    e.preventDefault();
    setLiked(!liked);
    setClicked(clicked === 0 ? 1 : 0);
    // tweet.numLikes = clicked;

    // fetch("/api/tweet/:tweetId/like", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ like: true }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(tweets);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
          {!liked ? <FaRegHeart color="black" /> : <FaHeart color="red" />}
          {clicked !== 0 && <TimesClick>{clicked}</TimesClick>}
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
  padding-left: 40px;
  font-size: 25px;
  position: absolute;
  display: ${(props) => (props.clicked === 0 ? "none" : "block")};
`;

export default TweetIcons;
