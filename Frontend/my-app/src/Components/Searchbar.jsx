import React,{useState} from "react";
function Searchbar(){
    const SearchHandler = (e)=>{
        e.preventDefault();
    }
    const [Keyword,setKeyword] = useState("");
    return (
        <form onSubmit={SearchHandler}>
           <div
              className="input-group  border-end-0"
              style={{
                flex: "1",
                borderRadius: "4px 0 0 4px",
              }}
            >
              <input
                type="text"
                placeholder="Search"
                className="form-control"
                onChange={(e)=>setKeyword(e.target.value)}
              />
              <Button style={{ backgroundColor: " #ff9e4a" }}>
                <FaSearch />
              </Button>
            </div>
            </form>
    );
}

export default Searchbar;