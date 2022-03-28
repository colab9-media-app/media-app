const SearchInput = props => {
  return (
    <div className="userSearch">

      <label className="sr-only" htmlFor="">Search for a movie or tv series:</label>
      <input 
        type="text" 
        required 
        onChange={props.change}
        value={props.value}  
        placeholder="Search for a movie or tv show"
      />
    </div>
  )
}

export default SearchInput;