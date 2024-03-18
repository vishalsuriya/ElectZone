import React from "react";
import SearchIcon from '@mui/icons-material/Search';
function Searchbar({placeholder, data})
{
    return (
        <div className="search">
            <div className="searchinput"><input type="text" placeholder="Search here....."/>
            <div className="searchicon"><SearchIcon/></div>
            </div>
<div className="dataresult">
     
</div>
        </div>
    )
}

export default Searchbar