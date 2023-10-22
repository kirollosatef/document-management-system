import SearchIcon from "@mui/icons-material/Search";
import "./Search.scss";

function Search() {
  return (
    <div className="search">
      <div className="search-heading">البحث عن ارشيف</div>
      <div className="search-bar">
        <div className="search-bar-input">
          <input type="text" />
        </div>
        <div className="search-bar-icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default Search;
