import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getInstructorProducts} from '../../../actions/productAction'
import Product from '../../general/Product'
import {decodeUser} from '../../../util'
class Products extends Component{

  constructor(props){
    super()
    this.state = {
      merchantProducts:[]
    }
  }
  componentDidMount(){

    this.props.getInstructorProducts(decodeUser().user.id)
  }
  componentWillReceiveProps(nextProps){
  //  if(nextProps && nextProps.products){
  //    const userId = decodeUser().user.id
  //    let merchantProducts = []
  //     merchantProducts = nextProps.products.products.filter(product => product.userId ===userId )
  //     this.setState({merchantProducts})
  //  }
    if(nextProps && nextProps.products && nextProps.products.products.length > 0){
      const merchantProducts = nextProps.products.products;
      this.setState({merchantProducts})
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
    const {merchantProducts} =this.state
    return (

      <div>

        {
          merchantProducts.map((product,index)=>{
            return (
              <Product key = {index} product={product} description ={this.productDetails(product)} buttonName="add images"/>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state)=>({
  products: state.products,
})

export default connect(mapStateToProps,{getInstructorProducts})(Products)
