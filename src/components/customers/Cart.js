import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Empty,Button} from 'antd'
import {getCart,removeFromCart} from '../../actions/cartActions'
import { List, Avatar } from 'antd';
import Navbar from '../general/Navbar'
import Payment from "./Payment"
var _ = require('lodash');
class Cart extends Component{
  constructor(props){
    super(props)
    this.state = {
      cart:{}
    }
  }
  componentDidMount(){
    this.props.getCart()
  }
  componentWillReceiveProps(nextProps){

    if(nextProps && nextProps.cart && nextProps.cart.cart){
      this.setState({cart:nextProps.cart.cart})
    }
  }
  removeProduct(product){
    const id = this.props.cart.cart._id
    const context = {id,product}
    console.log(context);
    this.props.removeFromCart(context).then(()=>{
      this.props.getCart()
    // window.location.reload()
    })
  }
  calculateTotal=()=>{
    let total = 0
    const cartProducts = this.state.cart.products
    console.log(cartProducts);
    if(cartProducts && cartProducts.length >0){
      cartProducts.forEach(product=>{total += product.price})
    }

    return total
  }
  render(){
      const {cart} = this.state
    return (
      <div>
      <Navbar/>
      <div>
        {_.isEmpty(cart.products) ?
            <div>
              <Empty>
                <Link to="/">
                <Button> keep shopping</Button>
                </Link>
              </Empty>
            </div>
                     :
            <div>
            <List
               itemLayout="horizontal"
               dataSource={cart.products || []}
               renderItem={item => (
                 <List.Item
                    actions = {[
                      <Button onClick = {()=>this.removeProduct(item)}>remove from cart </Button>
                    ]}
                    >
                   <List.Item.Meta
                     avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                     title={<a href="https://ant.design">{item.name}</a>}
                     description={item.description}
                   />

                   <div>
                   <p>Price : {item.price}</p>
                   </div>
                 </List.Item>
               )}
             />
             <div>
              <p>{`Total : ${this.calculateTotal()*100}`}</p>
              <Payment cart = {cart} total = {this.calculateTotal()*100}/>
             </div>
             {cart.products && <Link to="/"> Keep shoping</Link>}
             </div>

        }
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart:state.cart
})

export default connect(mapStateToProps,{getCart,removeFromCart})(Cart)
