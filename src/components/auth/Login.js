import React,{Component} from 'react'
import Input from '../general/Input'
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {message} from 'antd'
import {login} from '../../actions/authActions'
import {decodeUser} from "../../util"
import {addToCart} from "../../actions/cartActions"
class Login extends Component{
  constructor(){
    super()
    this.state = {
     email:"",
     password:"",
   }
   this.onChange = this.onChange.bind(this)
   this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps){
    const search = this.props.location.search
    let split = search.split("redirect=")
    const hasRedirect = search.includes("redirect=")
    split = split[split.length-1]

    if(nextProps && nextProps.errors && nextProps.errors.length >0){
      nextProps.errors.forEach((err)=>{
        message.error(err.msg)
      })
    }
    if(nextProps.isAuthenticated){
      if(split && hasRedirect){
        if(split === "/cart" && localStorage.getItem("token") && localStorage.getItem("products")){
          const userId = decodeUser().user.id
          const cartProducts = JSON.parse(localStorage.getItem("products"))
          const context = {products:cartProducts,userId:userId}
          this.props.addToCart(context)
          localStorage.removeItem("products")
        }
        this.props.history.push(split)
      }
    else{
      message.success("Thank you for signup")
      setTimeout(()=>{this.props.history.push("/")},3000)
    }

    }
  }

 onChange(e){
   this.setState({[e.target.name]:e.target.value})
  }
  onSubmit(){
    const {email,password} = this.state
    const newuser = {
      email,password
    }
    this.props.login(newuser)
  }
  render(){
    const {email,password} = this.state
    const search = this.props.location.search
    const split = search.split("redirect=")
    const redirect = split[split.length-1]
    const hasredirect = redirect.length >0 && search.includes("redirect");

        return (
          <>
            <h1>Sign In</h1>
            <p>Sign into your Account </p>
            <Input type = "text" name = "email" placeholder = "enter a Email" value={email} onChange = {this.onChange}/>
            <Input type = "password" name = "password" placeholder = "enter password" value={password} onChange = {this.onChange}/>
            <button onClick = {this.onSubmit}>Sign In</button>
            <p>Dont have account?
            <Link to={`/register?role=customer${hasredirect ? "&redirect=" + redirect : ""}`}>Sign up</Link>
            </p>
          </>
        )
      }
}

const mapStateToProps = (state)=>({
  isAuthenticated:state.auth.isAuthenticated,
  errors:state.auth.errors,
})
export default connect(mapStateToProps,{login,addToCart})(withRouter(Login))
