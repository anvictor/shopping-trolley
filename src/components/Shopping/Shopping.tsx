import React, { useState } from "react";
import colorButtonsData from "../object.json";
import { listingItem_Type } from "../../types";
import "./Shopping.css";
const { colorButtons } = colorButtonsData;

interface ShoppingProps {
  listingItems: listingItem_Type[];
}

function Shopping({ listingItems }: ShoppingProps) {
  const [shoppingList, setShoppingList] = useState(listingItems);

  const prepareOrdering = (item: listingItem_Type) => {
    item.prevOrder = item.order;
    item.order = 10 * +item.crossedOut + item.color;
    item.class = item.order < item.prevOrder ? "animatedUp" : "animatedDown";

    return item;
  };

  const clearPrevAnimation = (item: listingItem_Type) => {
    item.prevOrder = item.order;
    item.class = "";

    return item;
  };

  const prepareNewSort = (listingItems: listingItem_Type[]) => {
    return listingItems.sort((a, b) => a.order - b.order);
  };

  const getItem = (listingItems: listingItem_Type[], itemId: string) => {
    return listingItems.filter((item) => item.id === itemId)[0];
  };
  const animateReorder = (
    item: listingItem_Type,
    localShoppingList: listingItem_Type[]
  ) => {
    prepareOrdering(item);
    setShoppingList([...localShoppingList]);
    setTimeout(() => {
      clearPrevAnimation(item);
      setShoppingList(localShoppingList);
      prepareNewSort(localShoppingList);
      setShoppingList(localShoppingList);
    }, 200);
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

  const ColorButtons = ({ itemColor }: any) => (
    <div className="buttonsLine">
      {colorButtons.map((btn, index) => {
        if (btn.id === "0") {
          return null;
        }

        return (
          <button
            key={btn.id}
            data-value={btn.id}
            className={`typeColor${btn.id} button${
              btn.id == itemColor ? "Active" : ""
            }`}
            onClick={handleControlBtnClicked}
          >
            {btn.id}
          </button>
        );
      })}
    </div>
  );

  const CrossOut_X = (props: any) => {
    const { crossedOut } = props;

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
      {shoppingList.map((item: listingItem_Type) => (
        <li
          id={item.id}
          data-value={item.id}
          className={`typeColor${item.color} item ${item.class}`}
          key={item.id}
        >
          <span className={`${item.crossedOut ? "itemCrossedOut" : ""}`}>
            {item.value}
          </span>
          <CrossOut_X crossedOut={item.crossedOut} />
          <ColorButtons itemColor={item.color} />
        </li>
      ))}
    </ul>
  );
}

export default Shopping;
