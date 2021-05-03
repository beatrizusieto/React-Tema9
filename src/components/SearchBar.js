import React, { useState } from 'react';
import IconoSearchStyled from "./IconoSearch-styled";
import InputSearchStyled from "./InputSearch-styled";

const SearchBar = ({handleFormSubmit}) => {

	const [term, setTerm] = useState('');         
  const handleChange = (event) =>{
     setTerm(event.target.value)      
  }

  const handleSubmit = event => {
    event.preventDefault();
    handleFormSubmit(term);
  }

  return (
       <div className="row mt-2">
       <div className="col-11 p-2">
       <form className="ml-1 d-flex input-group" action="index.html" id="search" onSubmit={handleSubmit} name="mySearch">
       <div className="form-group rounded has-search input-group p-3">
        <IconoSearchStyled className="fa fa-search" />
        <InputSearchStyled  
            onChange={handleChange}  
            type="text"  
            className="form-control rounded mr-2"
            placeholder=" Search..." 
            value={term}
  	     />
        </div>        
        </form>
      </div>
      </div>);
    }
  export default SearchBar 

