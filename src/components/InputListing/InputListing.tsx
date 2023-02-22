import React, { useState } from "react";
import "./InputListing.css";

interface ListingProps {
  getListing: Function;
  listing: string;
}

function Listing({ getListing, listing }: ListingProps) {
  const [listText, setListText] = useState(listing);

  const handleReset = () => {
    getListing("");
    setListText("");
  };
  const handleSubmit = () => {
    getListing(listText);
  };

  return (
    <div className="listingWrapper">
      <textarea
        placeholder={`Copy, Write or
Dictate items
Separate them with commas (,)
Use dot (.) in numbers
  EXAMPLE:
milk 1L,
meat 1.5 kg, shugar 2.5 kg`}
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
    </div>
  );
}

export default Listing;
