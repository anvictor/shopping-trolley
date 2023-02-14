import React, { useState } from "react";
import "./App.css";
import Help from "./components/Help/Help";
import Listing from "./components/Listing/Listing";
import OldLists from "./components/OldLists/OldLists";
import Shopping from "./components/Shopping/Shopping";
import tabsData from "./components/Help/help.json";
import { createListview } from "./utils";

function App() {
  const [currentTab, setCurrentTab] = useState("Listing");
  const [listingView, setListingView] = useState([
    {  color: 0,
      id: '',
      value: '',
      crossedOut: false,
      prevOrder: 0,
      order: 0, },
  ]);

  const handleTabClicked = (e: any) => {
    setCurrentTab(e.target.dataset.value);
  };

  const Tabs = (
    <div className="tabs">
      {tabsData.tabTitles.map((tab, index) => (
        <button
          key={tab}
          data-value={tab}
          className={tab === currentTab ? "currentTab tab" : "tab"}
          onClick={handleTabClicked}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  const getListing = (listing: any) => {
    if (listing) {
      setCurrentTab("Shopping");
    }
    setListingView(createListview(listing));
  };

  return (
    <div className="App">
      {Tabs}
      {currentTab === "Listing" && <Listing getListing={getListing} />}
      {currentTab === "Shopping" && <Shopping listingView={listingView} />}
      {currentTab === "OldLits" && <OldLists />}
      {currentTab === "Help" && <Help />}
    </div>
  );
}

export default App;
