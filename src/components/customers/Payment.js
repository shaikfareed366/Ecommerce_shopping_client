import React,{Component} from 'react'
import StripCheckout from "react-stripe-checkout"
import axios from 'axios'
import {getServer} from '../../util'
import {message} from 'antd'
class Payment extends Component {
  constructor(props){
    super(props)
    this.handleToken = this.handleToken.bind(this)
  }
  async handleToken(token){
      console.log(token);

      const config ={
        headers:{
          "Content-Type" : "application/json"
        },
      }
      const context = {token,cart:this.props.cart,total:this.props.total}
      const res = await axios.post(`${getServer()}/api/payment`,context,config)
      console.log(res.data);
      if(res.data.status === 200){
        message.success("thank you for the payment")
      }else {
        message.error("something went error");
      }
  }
  render(){
    return (
      <div>
        <StripCheckout
          stripeKey = "pk_test_51KJDSEHtmqI2AWakIZ9ooW1bSWacutUONWtTQCZTbltfCMsL8HVkSPo8OD3yDOUNdvuQR0i2Z2roWck3a5JgVG1L00ZAZ0JIZQ"
          token = {this.handleToken}
          amount = {this.props.total}
          billingAdress
          shippingAddress
        />

      </div>
    )
  }
}

export default Payment
