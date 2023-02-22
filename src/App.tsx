import React, { useState } from "react";
import "./App.css";
import Help from "./components/Help/Help";
import InputListing from "./components/InputListing/InputListing";
import Shopping from "./components/Shopping/Shopping";
import tabsData from "./components/object.json";
import { createListview } from "./utils";
import { listingItem_Type } from "./types";
const { tabTitles } = tabsData;

const App = () => {
  const [currentTab, setCurrentTab] = useState("Listing");
  const [listingView, setListingView] = useState([
    {
      color: 0,
      id: "",
      value: "",
      crossedOut: false,
      prevOrder: 0,
      order: 0,
      class: "",
    },
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

  const listingJSON = localStorage.getItem("myShoppingList") || "";
  const savedListing = listingJSON ? JSON.parse(listingJSON) : null;
  const listing =
    savedListing &&
    savedListing.map((item: listingItem_Type) => item.value).join(`
`);

  const getListing = (listing: string) => {
    if (listing) {
      setCurrentTab("Shopping");
    }
    const listForView = createListview(listing);
    setListingView(listForView);
    localStorage.setItem("myShoppingList", JSON.stringify(listForView));
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
