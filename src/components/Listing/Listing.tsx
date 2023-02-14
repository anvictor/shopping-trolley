import React, { useState } from "react";
import "./Listing.css";

const Listing = (props: { getListing: Function; listing: string }) => {
  const { getListing, listing } = props;
  const [listText, setListText] = useState(listing);

  const handleReset = (e: any) => {
    e.preventDefault();
    getListing('');
    setListText('');
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    getListing(listText);
  };

  return (
      <form className="listingWrapper">
        <textarea
          placeholder="Copy, Write or
            Dictate items.
            Separate them with commas (,)
            Use the first item as a list header.
            EXAMPLE:
            my list, buy milk, plant a tree, build a house"
          className="inputListArea"
          rows={10}
          id="listing"
          name="name"
          value={listText}
          onChange={(e) => setListText(e.target.value)}
        ></textarea>

        <button className="Reset_X" onClick={handleReset} type="reset">
          X
        </button>
        <button className="submit" onClick={handleSubmit} type="submit">
          Submit
        </button>
      </form>
  );
};

export default Listing;
