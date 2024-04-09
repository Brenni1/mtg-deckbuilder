import "./SearchBox.css";

import Turnstone from "turnstone";
import { useState, useEffect } from "react";

const SearchBox = () => {
  const [searchResults, setSearchResults] = useState([]);

  const styles = { color: "red" };

  const customStyles = {
    item: {
      background: "#f4f4f4",
    },
  };

  const listbox = [
    {
      displayField: "name",
      data: async (query) => {
        try {
          const res = await fetch(`http://localhost:5005/user/card/search?q=${query}`);
          const data = await res.json();
          console.log("Fetched Data", data);
          const resultsWithId = data.map((card) => ({ id: card._id, name: card.name }));
          setSearchResults(resultsWithId);
          console.log("resultswithId", resultsWithId);
          return data;
        } catch (err) {
          console.log("error in autocompletesearch", err);
          return [];
        }
      },
      searchType: "startsWith",
    },
  ];

  return (
    <Turnstone
      //   className="search-box"
      id="search"
      name="search"
      autoFocus={true}
      typeahead={true}
      clearButton={true}
      debounceWait={250}
      listboxIsImmutable={false}
      maxItems={6}
      noItemsMessage="We couldn't find any character that matches your search"
      placeholder="Search for any character in the MCU"
      listbox={listbox}
      //   styles={customStyles}
    />
  );
};

export default SearchBox;
