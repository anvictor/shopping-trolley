import React, { useState } from "react";
import "./App.css";
import Help from "./components/Help/Help";
import InputListing from "./components/InputListing/InputListing";
import Shopping from "./components/Shopping/Shopping";
import tabsData from "./components/object.json";
import { createListview as createListView } from "./utils";
const { tabTitles } = tabsData;

const App = () => {
  const [currentTab, setCurrentTab] = useState("Listing");
  const [listingView, setListingView] = useState([
    { color: 0, id: "", value: "", crossedOut: false, prevOrder: 0, order: 0, class: "" },
  ]);

  const handleTabClicked = (e: any) => {
    setCurrentTab(e.target.dataset.value);
  };

  const Tabs = (
    <div className="tabs">
      {tabTitles.map((tab, index) => (
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

  const listing = localStorage.getItem("myShoppingList") || "";

  const getListing = (listing: string) => {
    if (listing) {
      setCurrentTab("Shopping");
    }
    setListingView(createListView(listing));
    localStorage.setItem("myShoppingList", listing);
  };

  return (
    <div className="App">
      {Tabs}
      {currentTab === "Listing" && (
        <InputListing getListing={getListing} listing={listing} />
      )}
      {currentTab === "Shopping" && listingView[0].value !== "" && (
        <Shopping listingItems={listingView} />
      )}
      {currentTab === "Shopping" && listingView[0].value === "" && (
        <h1>Please Submit listing first!</h1>
      )}
      {currentTab === "Help" && <Help />}
    </div>
  );
};

export default App;
