const SearchInput = props => {
  return (
    <div className="userSearch">

      <label htmlFor="">Search for a movie or tv series:</label>
      <input 
        type="text" 
        required 
        onChange={props.change}
        value={props.value}   
      />
    </div>
  )
}

export default SearchInput;