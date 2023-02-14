const createListview = (listing: string) => {
  const prepareToSplit0 = listing.replaceAll(",", ";");
  const prepareToSplit1 = prepareToSplit0.replaceAll("запятая", ";");
  const prepareToSplit2 = prepareToSplit1.replaceAll("кома", ";");
  const prepareToSplit3 = prepareToSplit2.replaceAll("comma", ";");
  const prepareToSplit4 = prepareToSplit3.replace(/\s/g, " ");

  const arr0 = prepareToSplit4.split(";");
  const arr = new Set<string>();
  arr0.forEach(item=>arr.add(item));
  const listView: {
    color: number;
    id: string;
    value: string;
    crossedOut: boolean;
    prevOrder: number;
    order: number;
    class: string;
  }[] = [];
  arr.forEach((element, index) => {
    listView.push({
      color: 0,
      id: `id_${element.trim()}`,
      value: element.trim(),
      crossedOut: false,
      prevOrder: 0,
      order: 0,
      class:'',
    });
  });
  return listView;
};

export { createListview };
