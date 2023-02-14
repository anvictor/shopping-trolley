import React, { useState } from "react";

const Listing = (props: { getListing: any }) => {
  const [listText, setListText] = useState("");
  const { getListing } = props;

  function handleSubmit(e: any) {
    e.preventDefault();
    getListing(listText);
  }

  return (
    <div className="App">
      <form>
        <label>Listing:</label>
        <textarea
          placeholder="Copy, Write or
            Dictate items.
            Separate them with commas (,)
            Use the first item as a list header.
            EXAMPLE:
            my list, buy milk, plant a tree, build a house"
          className="form-control"
          rows={10}
          id="listing"
          name="name"
          value={listText}
          onChange={(e) => setListText(e.target.value)}
        ></textarea>

        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Listing;
