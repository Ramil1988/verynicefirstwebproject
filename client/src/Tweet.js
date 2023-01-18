import { useEffect, useState } from "react";
import styled from "styled-components";
import TweetIcons from "./TweetIcons";
import moment from "moment";

const Tweet = ({ tweet }) => {
  const [tweets, setTweets] = useState();

  moment("2021-07-14T00:00:00.000Z").utc().format("YYYY-MM-DD");

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
      });
  }, []);

  return (
    <TweetWrapper>
      <UserWrapper>
        <UserLogo src={tweet["author"].avatarSrc} alt="User logo" />
        <UserName>{tweet["author"].displayName}</UserName>
        <UserInfo>
          <Nickname>@{tweet["author"].handle}</Nickname>
          <Separator>•</Separator>
          <TweetDate>
            {moment(`${tweet.timestamp}`).format("MMM D YYYY")}
          </TweetDate>
        </UserInfo>
      </UserWrapper>
      <TweetTextImageWrapper>
        <TweetText>{tweet.status}</TweetText>
        {tweet.media[0] && tweet.media[0].url && (
          <TweetImg src={tweet.media[0].url} alt="Tweet Image" />
        )}
      </TweetTextImageWrapper>
      <TweetIcons />
    </TweetWrapper>
  );
};

const TweetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;

  width: 100%;
  border-bottom: 1px solid lightgray;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TweetTextImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const UserLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.p`
  font-weight: bold;
`;

const Separator = styled.div`
  margin: 0 5px;
  color: gray;
`;

const TweetDate = styled.p`
  font-size: 12px;
  color: gray;
`;

const Nickname = styled(TweetDate)`
  font-size: 12px;
  color: gray;
`;

const TweetText = styled.p`
  font-size: 18px;
  width: 100%;
`;

const TweetImg = styled.img`
  width: 100%;
  height: 600px;
  border-radius: 10px;
  object-fit: cover;
`;

export default Tweet;
