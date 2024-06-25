import React from "react";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";
import Navbar from "./components/Navbar/Navbar";
import RouteWrapper from "./Route";

function App() {
  const token = localStorage.getItem("token");

  return (
    <AppProvider>
      {token ? <Navbar component={RouteWrapper} /> : <RouteWrapper />}
    </AppProvider>
  );
}

export default App;
