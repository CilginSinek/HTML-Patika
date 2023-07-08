import { useEffect, useState } from "react";
import { getFilter } from "../store/notes/notes.js";
import { useDispatch } from "react-redux";

function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  //arama inputuna yazi girildigi anda reduxa gonderiyorum
  useEffect(() => {
    dispatch(getFilter(search));
  }, [dispatch, search]);

  return (
    <input
      placeholder="Search Note..."
      className="search"
      type="search"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;
