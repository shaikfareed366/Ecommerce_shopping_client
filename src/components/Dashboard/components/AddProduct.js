import React,{Component} from 'react'
import Input from '../../general/Input'
import {addProduct} from '../../../actions/productAction'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {message} from 'antd'
class AddProduct extends Component {
    constructor(props){
      super(props)
      this.state = {
        name : "",
        description:"",
        price:'',
        brand:'',
        quantity:'',
        category:'',
      }

    }
    onChange=(e)=>{

        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit=()=>{
        const {name,description,price,brand,quantity,category} = this.state
        const newProduct = {name,description,price,brand,quantity,category}
          this.props.addProduct(newProduct,this.props.history)
          if(name.length <= 0){
            return message.error("name field is required")
          }
          if(description.length <= 0){
            return message.error("description field is required")
          }
        }
    render(){
      const {name,description,price,brand,quantity,category} = this.state
      return (
        <div>
        <h1>add product</h1>
        <Input type = "text" placeholder = "name of the product" name = "name" value = {name} onChange = {this.onChange} />
        <Input type = "text" placeholder = "Give a brief description" name = "description" value = {description} onChange = {this.onChange} />
        <Input type = "number" placeholder = "Enter a Price" name = "price" value = {price} onChange = {this.onChange} />
        <Input type = "text" placeholder = "Enter brand of product" name = "brand" value = {brand} onChange = {this.onChange} />
        <Input type = "number" placeholder = "Enter Quantity" name = "quantity" value = {quantity} onChange = {this.onChange} />
        <select name="category" value = {category} onChange={this.onChange}>
          <option value="0">Select category for this product</option>
          <option value="clothing">clothing</option>
          <option value="Electronics">Electornics</option>
          <option value="Office supply">Office supply</option>
          <option value="Automotive supply">Automotive supply</option>
          <option value="Cosmetics">Cosmetics</option>
        </select>
        <button onClick = {this.onSubmit}>submit</button>
        </div>
      )

    }

}
const mapStateToProps = (state)=>({
  products:state.products,
})

export default connect(mapStateToProps,{addProduct})(withRouter(AddProduct))
