import styled from "styled-components";

import {
  FaRegComment,
  FaRetweet,
  FaLikeIcon,
  FaRegHeart,
  FaUpload,
} from "react-icons/fa";

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
  margin: 20px;
  cursor: pointer;
  &:hover {
    border-radius: 20px;
    transform: scale(1.2);
  }
`;

// const ReplyIcon = styled(FaReply)`
//   color: #657786;
// `;
// const RetweetIcon = styled(FaRetweet)`
//   color: #657786;
// `;
// const LikeIcon = styled(FaHeart)`
//   color: #657786;
// `;
// const ShareIcon = styled(FaShare)`
//   color: #657786;
// `;

export default TweetIcons;
