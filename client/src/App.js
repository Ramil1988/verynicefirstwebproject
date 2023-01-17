import { useContext } from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import BookMarks from "./Bookmarks";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Profile from "./Profile";
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
        <>
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
            </Routes>
          </MainContainer>
        </>
      )}
    </>
  );
};

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SideBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
`;

const MainContainer = styled.div`
  margin-left: 250px;
`;

export default App;

// const [name, setName] = useState();

// useEffect(() => {
//   fetch("./api/me/profile")
//     .then((response) => response.json())
//     .then((data) => setName(data.profile.bio));
// }, []);
