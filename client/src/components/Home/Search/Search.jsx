import SearchIcon from "@mui/icons-material/Search";
import "./Search.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { archiveSearch } from "@store/stats/statsSlice";

function Search() {
  const dispatch = useDispatch();
  const [keyword, setkeyword] = useState("");
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  const searchHandler = () => {
    dispatch(archiveSearch(keyword));
  };
  return (
    <div className="search">
      <div className="search-heading">البحث عن ارشيف</div>
      <div className="search-bar">
        <div className="search-bar-input">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setkeyword(e.target.value)}
            onKeyUp={handleKeyPress}
          />
        </div>
        <div className="search-bar-icon" onClick={searchHandler}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default Search;
