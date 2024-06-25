// import React, { useEffect, useState, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   Frame,
//   Navigation,
//   TopBar,
//   Avatar,
//   ActionList,
// } from "@shopify/polaris";
// import { fetchUserRequest } from "../../ducks/Navbar";
// import {
//   HomeFilledIcon,
//   ProfileIcon,
//   PageUpIcon,
//   ResetIcon,
// } from "@shopify/polaris-icons";
// import insta from "../../img/image.png";
// import svg from "../../img/svg1.svg";

// const Navbar = ({ component: Component }) => {
//   const auth = localStorage.getItem("user");
//   const name = auth ? JSON.parse(auth).name : null;
//   const email = auth ? JSON.parse(auth).email : null;
//   const Photo = auth ? JSON.parse(auth).Photo : null;
//   const userId = auth ? JSON.parse(auth)._id : null;
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [userMenuActive, setUserMenuActive] = useState(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [searchValue, setSearchValue] = useState("");

//   const toggleUserMenuActive = () => {
//     setUserMenuActive((userMenuActive) => !userMenuActive);
//   };

//   const handleSearchResultsDismiss = useCallback(() => {
//     setIsSearchActive(false);
//     setSearchValue("");
//   }, []);

//   const handleSearchChange = useCallback((value) => {
//     setSearchValue(value);
//     setIsSearchActive(value.length > 0);
//   }, []);

//   const logout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (confirmLogout) {
//       localStorage.removeItem("user");
//       localStorage.removeItem("login");
//       localStorage.removeItem("token");
//       localStorage.removeItem("Register");
//       localStorage.removeItem("page");
//       navigate("/login");
//     }
//     window.location.reload();
//   };

//   const userMenuActions = [
//     {
//       items: [
//         {
//           content: "Profile Edit",
//           onAction: () => navigate("/updateprofile"),
//         },
//         { content: "Logout", onAction: logout },
//       ],
//     },
//   ];

//   // useEffect(() => {
//   //   if (userId) {
//   //     dispatch(fetchUserRequest(userId));
//   //   }
//   // }, [userId, dispatch]);

//   const logo = {
//     width: 40,
//     topBarSource: insta, // Use the imported image for the logo
//     contextualSaveBarSource: insta, // Use the imported image for the contextual save bar logo
//     url: "#",
//     accessibilityLabel: "Wiser Review",
//   };

//   const searchResultsMarkup = (
//     <ActionList
//       items={[
//         { content: "Shopify help center" },
//         { content: "Community forums" },
//       ]}
//     />
//   );

//   const searchFieldMarkup = (
//     <TopBar.SearchField
//       onChange={handleSearchChange}
//       value={searchValue}
//       placeholder="Search"
//       showFocusBorder
//     />
//   );

//   const topBarMarkup = (
//     <TopBar
//       userMenu={
//         auth && (
//           <TopBar.UserMenu
//             actions={userMenuActions}
//             name={name}
//             detail={email}
//             open={userMenuActive}
//             onToggle={toggleUserMenuActive}
//             avatar={Photo}
//           />
//         )
//       }
//       searchResultsVisible={isSearchActive}
//       searchField={searchFieldMarkup}
//       searchResults={searchResultsMarkup}
//       onSearchResultsDismiss={handleSearchResultsDismiss}
//     />
//   );

//   const navigationMarkup = (
//     <Navigation location="/">
//       <Navigation.Section
//         items={[
//           {
//             label: "Home",
//             icon: HomeFilledIcon,
//             onClick: () => navigate("/home"),
//           },
//           {
//             label: "Profile",
//             icon: ProfileIcon,
//             onClick: () => navigate("/profile"),
//           },
//           {
//             label: "Upload Post",
//             icon: PageUpIcon,
//             onClick: () => navigate("/upload"),
//           },
//           {
//             label: "Testing Polaris",
//             icon: ResetIcon,
//             onClick: () => navigate("/polaris"),
//           },
//         ]}
//       />
//     </Navigation>
//   );

//   return (
//     <Frame logo={logo} topBar={topBarMarkup} navigation={navigationMarkup}>
//       <Component />
//     </Frame>
//   );
// };

// export default Navbar;

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Frame,
  Navigation,
  TopBar,
  Avatar,
  ActionList,
} from "@shopify/polaris";
import { fetchUserRequest } from "../../ducks/Navbar";
import {
  HomeFilledIcon,
  ProfileIcon,
  PageUpIcon,
  ResetIcon,
} from "@shopify/polaris-icons";
import insta from "../../img/image.png";
import svg from "../../img/svg1.svg";

const Navbar = ({ component: Component }) => {
  const auth = localStorage.getItem("user");
  const name = auth ? JSON.parse(auth).name : null;
  const email = auth ? JSON.parse(auth).email : null;
  const Photo = auth ? JSON.parse(auth).Photo : null;
  const userId = auth ? JSON.parse(auth)._id : null;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleUserMenuActive = () => {
    setUserMenuActive((userMenuActive) => !userMenuActive);
  };

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue("");
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
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

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchUserRequest(userId));
  //   }
  // }, [userId, dispatch]);

  const logo = {
    width: 40,
    topBarSource: insta, // Use the imported image for the logo
    contextualSaveBarSource: insta, // Use the imported image for the contextual save bar logo
    url: "#",
    accessibilityLabel: "Wiser Review",
  };

  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: "Shopify help center" },
        { content: "Community forums" },
      ]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
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
      searchResults={searchResultsMarkup}
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
      <Component />
    </Frame>
  );
};

export default Navbar;
