import React from 'react'
import propTypes from 'prop-types'
import {Link} from 'react-router-dom'
const Product = ({product,description,link})=>{

  return (
      <div>
          <Link to ={link}>
            <h1>{product.name}</h1>
            <div>{description}</div>
          </Link>
      </div>
  )
}
Product.propTypes = {
  product : propTypes.object.isRequired,
  description : propTypes.func.isRequired,
  buttonName : propTypes.string,
}
export default Product
