import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../../actions/productAction'
import Product from '../general/Product'
import {Modal} from 'antd'
class Products extends Component{
  constructor(){
    super()
    this.state ={
      products:[],
    }
  }
  componentDidMount(){
    this.props.getProducts()
  }
  componentWillReceiveProps(nextProps){

    if(nextProps && nextProps.products.products){
      const products = nextProps.products.products
      this.setState({products})
    }
  }
  productDetails = (product)=>{
    return (
      <ul>
        <li>${product.price}</li>
        <li>Quantity:{product.quantity}</li>
      </ul>
    )
  }

  

  render(){
    const {products} =this.state
    return (
      <div>
        {products.map((product,index)=>{
          return (
              <Product key = {index} link = {`products/${product._id}`} product = {product} description = {this.productDetails(product)}/>
          )

        })}
      </div>
    );

  }
}

const mapStateToProps = (state)=>(
    {products : state.products,}
)
export default connect(mapStateToProps,{getProducts})(Products)
