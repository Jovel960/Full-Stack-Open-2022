const Input = ({onSearch, search}) =>{
    return (
        <div>
            Find countries: <input onChange={onSearch} value={search} />
        </div>
    )

}


export default Input;