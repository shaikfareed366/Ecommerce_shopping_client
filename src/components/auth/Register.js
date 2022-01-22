import React,{Component} from 'react'
import Input from '../general/Input'
import {register} from '../../actions/authActions'
import {connect} from 'react-redux'
import {message} from 'antd'
import {withRouter} from "react-router-dom";
import {decodeUser} from "../../util"
import {addToCart} from "../../actions/cartActions"
class Register extends Component{
  constructor(){
    super()
   this.state = {
      name:"",
      email:"",
      password:"",
      password2:"",
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentWillReceiveProps(nextProps){
    const search = this.props.location.search
    let split = search.split("redirect=")
    const hasRedirect = search.includes("redirect=")
    split = split[split.length-1]

    if(nextProps && nextProps.auth.errors && nextProps.auth.errors.length > 0){
        nextProps.auth.errors.forEach(err => {
            message.error(err.msg);
        })
    }
    if(nextProps.auth.isAuthenticated){
      if(split && hasRedirect){
        if(split === "/cart" && localStorage.getItem("token") && localStorage.getItem("products")){
          const userId = decodeUser().user.id
          const cartProducts = JSON.parse(localStorage.getItem("products"))
          const context = {products:cartProducts,userId:userId}
          this.props.addToCart(context)
          localStorage.removeItem("products")
        }
        this.props.history.push(split)
      }else {
        message.success("thankyou for signup")
        setTimeout(()=>this.props.history.push("/"),3000)
      }

    }
  }
  onChange(e){
    console.log(this.props.location);
    this.setState({[e.target.name]:e.target.value})
  }
  onSubmit(){
    let split = this.props.location.search.split("?role=")
    split  = split[split.length-1].split("&")
    const role = split[0]
    const {name,email,password} = this.state
    const newuser = {name,email,password,role}
    if(password === this.state.password2 ){
        this.props.register(newuser)
    }else{
      console.log("password dont match");
    }
  }
  render(){
      const {name,email,password,password2} = this.state
        return (
            <div>
              <h1>Register</h1>
              <p>Create Your Account</p>
              <Input type = "text" name = "name" placeholder = "enter a name" value={name} onChange = {this.onChange}/>
              <Input type = "text" name = "email" placeholder = "enter a Email" value={email} onChange = {this.onChange}/>
              <Input type = "password" name = "password" placeholder = "enter password" value={password} onChange = {this.onChange}/>
              <Input type = "password" name = "password2" placeholder = "confirm password" value={password2} onChange = {this.onChange}/>
              <button onClick = {this.onSubmit}>Register</button>

              </div>
            )
          }
    }

const mapStateToProps = (state) =>({auth:state.auth})

export default connect(mapStateToProps,{register,addToCart})(withRouter(Register))
