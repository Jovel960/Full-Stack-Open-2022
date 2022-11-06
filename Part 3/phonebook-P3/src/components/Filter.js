const Filter = ({handleFilter , search}) => {
  return (
    <div>
      Search for a contact: <input value={search} onChange={handleFilter} />
    </div>
  );
};

export default Filter;