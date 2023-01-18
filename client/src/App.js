import { useContext } from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import BookMarks from "./Bookmarks";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Media from "./Media";
import Likes from "./Likes";
import TweetDetails from "./TweetDetails";
import GlobalStyles from "./GlobalStyles";
import SideBar from "./Sidebar";
import { CurrentUserContext } from "./CurrentUserContext";
import Loading from "./CircularProgressCustom";

const App = () => {
  const { currentUser, status } = useContext(CurrentUserContext);

  return (
    <>
      {status === "loading" ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <MainWrapper>
          <GlobalStyles />
          <SideBarContainer>
            <SideBar currentUser={currentUser}></SideBar>
          </SideBarContainer>
          <MainContainer>
            <Routes>
              <Route path="/" element={<HomeFeed />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/bookmarks" element={<BookMarks />} />
              <Route path="/tweer/:tweetId" element={<TweetDetails />} />
              <Route path="/:profileId" element={<Profile />} />
              <Route path="/:profileId/media" element={<Media />} />
              <Route path="/:profileId/likes" element={<Likes />} />
            </Routes>
          </MainContainer>
        </MainWrapper>
      )}
    </>
  );
};

const MainWrapper = styled.div`
  width: 100vw;
  display: flex;
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SideBarContainer = styled.div`
  top: 0;
  left: 0;
  bottom: 0;
  width: 15vw;
  margin-left: 20px;
  margin-top: 20px;
`;

const MainContainer = styled.div`
  max-width: 900px;
`;

export default App;
