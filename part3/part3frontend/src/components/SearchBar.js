const SearchBar = (p) =>{
    return (
      <div>
        search: <input value={p.searchedName}
                       onChange={p.filter}/>
      </div>
    )
  }

  export default SearchBar