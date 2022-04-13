const SearchInput = (props) => {
  return (
    <div className="userSearch">
      <label className="sr-only" htmlFor="">
        Search for a movie or tv series:
      </label>
      <input
        type="text"
        required
        onChange={props.change}
        value={props.value}
        placeholder="Search for a movie or tv show"
        maxLength="45"
      />
      <button className="searchButton">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
};

export default SearchInput;
