import React from "react"
import propTypes from "prop-types"
const Input = ({type,name,placeholder,value,onChange})=>{
  return (
    <>
      <input type={type} name={name} placeholder ={placeholder} value ={value} onChange = {onChange} />
    </>
  )
}

Input.propTypes = {
  name : propTypes.string,
  placeholder : propTypes.string,
  value : propTypes.string,
  type : propTypes.string,
  onChange : propTypes.func.isRequired,
}

export default Input 
