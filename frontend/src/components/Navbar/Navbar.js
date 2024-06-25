import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Frame, Navigation, TopBar, ActionList } from "@shopify/polaris";
import {
  HomeFilledIcon,
  ProfileIcon,
  PageUpIcon,
  ResetIcon,
} from "@shopify/polaris-icons";
import insta from "../../img/image.png";
import PostList from "./PostList";

const Navbar = ({ component: Component }) => {
  const auth = localStorage.getItem("user");
  const name = auth ? JSON.parse(auth).name : null;
  const email = auth ? JSON.parse(auth).email : null;
  const Photo = auth ? JSON.parse(auth).Photo : null;
  const navigate = useNavigate();
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const toggleUserMenuActive = () => {
    setUserMenuActive((userMenuActive) => !userMenuActive);
  };

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue("");
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setSearchKey(value); // Update search key
    setIsSearchActive(value.length > 0);
  }, []);

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("login");
      localStorage.removeItem("token");
      localStorage.removeItem("Register");
      localStorage.removeItem("page");
      navigate("/login");
    }
    window.location.reload();
  };

  const userMenuActions = [
    {
      items: [
        {
          content: "Profile Edit",
          onAction: () => navigate("/updateprofile"),
        },
        { content: "Logout", onAction: logout },
      ],
    },
  ];

  const logo = {
    width: 40,
    topBarSource: insta,
    contextualSaveBarSource: insta,
    url: "#",
    accessibilityLabel: "Wiser Review",
  };

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search "
      showFocusBorder
    />
  );

  const topBarMarkup = (
    <TopBar
      userMenu={
        auth && (
          <TopBar.UserMenu
            actions={userMenuActions}
            name={name}
            detail={email}
            open={userMenuActive}
            onToggle={toggleUserMenuActive}
            avatar={Photo}
          />
        )
      }
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: "Home",
            icon: HomeFilledIcon,
            onClick: () => navigate("/home"),
          },
          {
            label: "Profile",
            icon: ProfileIcon,
            onClick: () => navigate("/profile"),
          },
          {
            label: "Upload Post",
            icon: PageUpIcon,
            onClick: () => navigate("/upload"),
          },
          {
            label: "Testing Polaris",
            icon: ResetIcon,
            onClick: () => navigate("/polaris"),
          },
        ]}
      />
    </Navigation>
  );

  return (
    <Frame logo={logo} topBar={topBarMarkup} navigation={navigationMarkup}>
      {isSearchActive ? <PostList searchKey={searchKey} /> : <Component />}
    </Frame>
  );
};

export default Navbar;
