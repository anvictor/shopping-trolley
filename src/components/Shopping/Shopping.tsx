import React, { useState } from "react";
import colorsData from "../object.json";

import "./Shopping.css";
const Shopping = (props: { listingView: any }) => {
  const { listingView } = props;
  const [shoppingList, setShoppingList] = useState(listingView);

  const prepareOrdering = (item: {
    prevOrder: any;
    order: any;
    crossedOut: number;
    color: number;
    id: string;
    class: string;
  }) => {
    item.prevOrder = item.order;
    item.order = 10 * item.crossedOut + item.color;
    item.class = item.order < item.prevOrder ? "animatedUp" : "animatedDown";
    console.log("ordnung");

    return item;
  };

  const clearPrevAnimation = (item: {
    prevOrder: any;
    order: any;
    crossedOut: number;
    color: number;
    id: string;
    class: string;
  }) => {
    item.prevOrder = item.order;
    item.class = "";
    console.log("clearPrev");

    return item;
  };

  const prepareNewSort = (list: any[]) => {
    return list.sort((a, b) => a.order - b.order);
  };

  const getItem = (list: any[], itemId: any) => {
    return list.filter((item) => item.id === itemId)[0];
  };
  const animateReorder = (item: { prevOrder: any; order: any; crossedOut: number; color: number; id: string; class: string; }, localShoppingList: any[]) => {
    prepareOrdering(item);
    setShoppingList([...localShoppingList]);
    setTimeout(() => {
      clearPrevAnimation(item);
      setShoppingList(localShoppingList);
      prepareNewSort(localShoppingList);
      setShoppingList(localShoppingList);
    }, 300);
  };

  const handleControlBtnClicked = (e: any) => {
    const localShoppingList = [...shoppingList];
    if (e.target.dataset.value === "CrossOut_X") {
      const itemId = e.target.parentNode.dataset.value;
      const item = getItem(localShoppingList, itemId);
      item.crossedOut = !item.crossedOut;
      animateReorder(item, localShoppingList);

    } else {
      const itemId = e.target.parentNode.parentNode.dataset.value;
      const itemColor = +e.target.dataset.value;
      const item = getItem(localShoppingList, itemId);
      item.color = itemColor;
      animateReorder(item, localShoppingList);
     
    }
  };

  const ColorButtons = () => (
    <div className="buttonsLine">
      {colorsData.colorButtons.map((btn, index) => {
        if (btn.id === "0") {
          return null;
        }

        return (
          <button
            key={btn.id}
            data-value={btn.id}
            className={`itemColor${btn.id} button`}
            onClick={handleControlBtnClicked}
          >
            {btn.id}
          </button>
        );
      })}
    </div>
  );

  const CrossOut_X = ({ crossedOut }: any) => {
    return (
      <button
        onClick={handleControlBtnClicked}
        className={`button ${crossedOut ? "out" : ""} cossOutButton`}
        data-value="CrossOut_X"
      >
        {crossedOut ? "V" : "X"}
      </button>
    );
  };

  return (
    <ul className="noDots" id="listWRapper">
      {shoppingList.map((item: any) => (
        <li
          id={item.id}
          data-value={item.id}
          className={`itemColor${item.color} item ${item.class}`}
          key={item.id}
        >
          <span className={`${item.crossedOut ? "itemCrossedOut" : ""}`}>
            {item.value}
          </span>
          <CrossOut_X crossedOut={item.crossedOut} />
          <ColorButtons />
        </li>
      ))}
    </ul>
  );
};

export default Shopping;
