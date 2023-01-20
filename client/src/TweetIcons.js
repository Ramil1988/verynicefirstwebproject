import styled from "styled-components";
import { useState } from "react";

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

  const handleClick = () => {
    setLiked(!liked);
    setClicked(clicked === 0 ? 1 : 0);
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
