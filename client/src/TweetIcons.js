import styled from "styled-components";

import { FaRegComment, FaRetweet, FaRegHeart, FaUpload } from "react-icons/fa";

const TweetIcons = () => {
  return (
    <IconsWrapper>
      <Button>
        <FaRegComment />
      </Button>
      <Button>
        <FaRetweet />
      </Button>
      <Button>
        <FaRegHeart />
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

const Button = styled.button`
  background: transparent;
  border: none;
  font-size: 30px;

  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

export default TweetIcons;
