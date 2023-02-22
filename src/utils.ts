import { listingItem_Type } from "./types";

const orderByColorAndCrossedOut = (item: listingItem_Type) => {
  item.prevOrder = item.order;
  item.order = 10 * +item.crossedOut + item.color;

  return item;
};

const sortByOrder = (listingItems: listingItem_Type[]) => {
  return listingItems.sort((a, b) => a.order - b.order);
};

const clearElement = (text: string) => {
  const bracket = text.slice(1, 2);
  const space = text.slice(3, 4);
  const isMark = bracket === ")" && space === " ";
  const res = isMark ? text.slice(4) : text;

  return res;
};

const valueSetMark = (item: listingItem_Type) => {
  const mark = `${item.color})${item.crossedOut ? "+" : "-"}`;
  const result = mark + " " + clearElement(item.value);
  return result;
};

const getColor = (text: string) => {
  const bracket = text.slice(1, 2);
  const space = text.slice(3, 4);
  const isMark = bracket === ")" && space === " ";
  const color = isMark ? text.slice(0, 1) : "";

  return +color;
};

const getCrossedOut = (text: string) => {
  const bracket = text.slice(1, 2);
  const space = text.slice(3, 4);
  const isMark = bracket === ")" && space === " ";
  const sign = text.slice(2, 3);
  const isCrossedOut = isMark ? (sign === "+" ? true : false) : false;

  return isCrossedOut;
};

const createListview = (listing: string) => {
  const prepareToSplit0 = listing.replaceAll(",", ";");
  const prepareToSplit1 = prepareToSplit0.replaceAll("запятая", ";");
  const prepareToSplit2 = prepareToSplit1.replaceAll("кома", ";");
  const prepareToSplit3 = prepareToSplit2.replaceAll("comma", ";");
  const prepareToSplit4 = prepareToSplit3.replaceAll(
    `
`,
    ";"
  );

  const arr0 = prepareToSplit4.split(";");
  const arr = new Set<string>();
  arr0.forEach((item) => arr.add(item));

  const listingView: listingItem_Type[] = [];

  arr.forEach((element) => {
    const notNullElement = element.trim();
    if (notNullElement) {
      const color = getColor(notNullElement);
      const crossedOut = getCrossedOut(notNullElement);
      const crossedMark = crossedOut ? "+" : "-";

      listingView.push({
        color: color,
        id: `id_${notNullElement}`,
        value: `${color})${crossedMark} ${clearElement(notNullElement)}`,
        crossedOut: crossedOut,
        prevOrder: 0,
        order: 0,
        class: "",
      });
    }
  });
  listingView.forEach((item) => {
    valueSetMark(item)
    orderByColorAndCrossedOut(item)
  }
  );
  sortByOrder(listingView);
  return listingView;
};

export { createListview, valueSetMark, sortByOrder };
