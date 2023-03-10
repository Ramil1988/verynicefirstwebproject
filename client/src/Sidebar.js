import { ReactComponent as Applogo } from "./assets/logo.svg";
import { COLORS } from "./constants";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { useState } from "react";

import { FaHome, FaUser, FaBell, FaBookmark } from "react-icons/fa";
import TweetDialog from "./TweetDialog";

const SideBar = ({ currentUser }) => {
  const profileId = currentUser.profile.handle;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <NavLink to="/">
        <Applogo />
      </NavLink>
      <NavigationLink to="/" icon={<FaHome />}>
        Home
      </NavigationLink>
      <NavigationLink to={`${profileId}`} icon={<FaUser />}>
        Profile
      </NavigationLink>
      <NavigationLink to="/notifications" icon={<FaBell />}>
        Notifications
      </NavigationLink>
      <NavigationLink to="/bookmarks" icon={<FaBookmark />}>
        Bookmarks
      </NavigationLink>
      <MeowButton onClick={() => setIsDialogOpen(true)}>Meow</MeowButton>
      <TweetDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

const NavigationLink = ({ to, icon, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <StyledNavLink
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavigationLinkWrapper isHovered={isHovered}>
        <NavigationLinkIcon>{icon}</NavigationLinkIcon>
        <NavigationLinkText>{children}</NavigationLinkText>
      </NavigationLinkWrapper>
    </StyledNavLink>
  );
};

const NavigationLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
  margin: 20px;

  transition: background-color 0.2s;
  ${(props) =>
    props.isHovered &&
    css`
      background-color: hsl(258deg 96% 90%);
      border-radius: 20px;
      padding: 0px 0px;
    `}
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #000;
  display: flex;
  align-items: center;

  &.active {
    color: ${COLORS.primary};
  }
`;

const NavigationLinkIcon = styled.div`
  margin-right: 10px;
`;
const NavigationLinkText = styled.div``;

const MeowButton = styled.button`
  text-align: center;
  padding: 10px;
  width: 180px;
  margin: 10px;

  color: white;
  font-weight: bold;
  font-size: 18px;
  background-color: ${COLORS.primary};
  border-radius: 20px;
  border: none;

  &:hover {
    transform: scale(1.2);
  }
`;

export default SideBar;
