import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Tweet from "./Tweet";
import Spinner from "./Spinner";
import ErrorScreen from "./ErrorScreen";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { COLORS } from "./constants";

import moment from "moment";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { profileId } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
      });
  }, [profileId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <ProfileWrapper>
      <Banner src={user["profile"].bannerSrc} alt="Profile Banner" />
      <AvatarAndButtonContainer>
        <AvatarContainer>
          <Avatar src={user["profile"].avatarSrc} alt="Profile Avatar" />
        </AvatarContainer>
        <FollowingButton>Following</FollowingButton>
      </AvatarAndButtonContainer>
      <UserInfo>
        <Name>{user["profile"].displayName}</Name>
        <Nickname>@{user["profile"].handle}</Nickname>
        <Bio>{user["profile"].bio}</Bio>
        <LocationJoinDateWrapper>
          {user["profile"].location && (
            <LocationWrapper>
              <Location>
                <LocationIcon />
                {user["profile"].location}
              </Location>
            </LocationWrapper>
          )}
          {user["profile"].joined && (
            <JoinDateWrapper>
              <JoinDate>
                <JoinDateIcon />
                Joined {moment(`${user["profile"].joined}`).format("MMMM YYYY")}
              </JoinDate>
            </JoinDateWrapper>
          )}
        </LocationJoinDateWrapper>
        <FollowsArea>
          <Followers>
            <span>{user["profile"].numFollowers}</span>Followers
          </Followers>
          <Following>
            <span>{user["profile"].numFollowing}</span> Following
          </Following>
        </FollowsArea>
      </UserInfo>
      <BarSection />
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
`;

const LocationJoinDateWrapper = styled.div`
  display: flex;
`;

const LocationWrapper = styled.div`
  display: flex;
  margin: 5px;
`;

const JoinDateWrapper = styled(LocationWrapper)``;

const Banner = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const AvatarAndButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AvatarContainer = styled.div`
  margin-top: -50px;
  position: relative;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid white;
  position: absolute;

  transform: translate(10%, -20%);
`;

const FollowingButton = styled.button`
  text-align: center;
  padding: 10px;
  width: 150px;
  margin: 20px;
  float: left;
  color: white;
  font-weight: bold;
  font-size: 18px;
  background-color: ${COLORS.primary};
  border-radius: 20px;
  border: none;
`;

const UserInfo = styled.div`
  margin-top: 5px;
`;

const Name = styled.h2`
  font-size: 32px;
  font-weight: bold;
`;

const Nickname = styled.h3`
  font-size: 24px;
  color: gray;
`;

const Bio = styled.p`
  font-size: 18px;
  margin-top: 10px;
`;

const Location = styled.p`
  font-size: 18px;
  margin-top: 10px;
`;

const JoinDate = styled.p`
  font-size: 18px;
  margin-top: 10px;
`;

const LocationIcon = styled(FaMapMarkerAlt)`
  margin-right: 5px;
`;

const JoinDateIcon = styled(FaCalendarAlt)`
  margin-right: 5px;
`;

const FollowsArea = styled.div`
  display: flex;
`;

const Followers = styled.p`
  display: flex;
  font-size: 18px;
  margin: 10px;

  & span {
    font-weight: bold;
    padding-right: 5px;
  }
`;

const Following = styled(Followers)``;

const BarSection = () => {
  const [activeBar, setActiveBar] = useState("Tweets");
  const { profileId } = useParams();
  const [tweets, setTweets] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
      })
      .catch(() => {
        setError(true);
      });
  }, [tweets]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (activeBar !== "Tweets") {
  //     navigate(`/${profileId}/${activeBar.toLowerCase()}`);
  //   }
  // }, [activeBar, navigate]);

  const handleBarClick = (bar) => {
    setActiveBar(bar);
  };

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <>
      <BarWrapper>
        <BarText
          active={activeBar === "Tweets"}
          onClick={() => handleBarClick("Tweets")}
        >
          Tweets
        </BarText>
        <BarText
          active={activeBar === "Media"}
          onClick={() => handleBarClick("Media")}
        >
          Media
        </BarText>
        <BarText
          active={activeBar === "Likes"}
          onClick={() => handleBarClick("Likes")}
        >
          Likes
        </BarText>
      </BarWrapper>
      <LineWrapper active={activeBar}>
        <Line />
      </LineWrapper>
      <Tweets>
        {tweets &&
          tweets.tweetIds.map((tweetId) => (
            <Tweet
              key={tweetId}
              tweetId={tweetId}
              tweet={tweets.tweetsById[tweetId]}
            />
          ))}
      </Tweets>
    </>
  );
};

const BarWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 15px;
`;

const BarText = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
  font-size: 25px;
  padding: 15px;
  color: ${({ active }) => (active ? "hsl(258deg, 100%, 50%)" : "black")};
  cursor: pointer;
  &:hover {
    color: hsl(258deg, 100%, 50%);
  }
`;

const LineWrapper = styled.div`
  position: relative;
  flex: 1;
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: ${({ active }) =>
      active === "Tweets" ? 0 : active === "Media" ? "33.33%" : "66.66%"};
    width: 33.33%;
    height: 2px;
    background-color: hsl(258deg, 100%, 50%);
    transition: left 0.3s ease-in-out;
  }
`;

const Tweets = styled.div`
  width: 100%;
`;

const Line = styled.div`
  width: 150%;
`;

export default Profile;
