import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../actions/authActions'
import PropTypes from 'prop-types'
class Dashboard extends Component{
  constructor(props){
    super()
    this.state = {
      child:props.nestedRoute,
      search:""
    }

  }
  componentDidMount(){
  //  this.activeNav()
  }
//    activeNav(){
//      const pathname = window.location.pathname
//      const possibleRoutes = [
//        {routes:"/dashboard",targetId:"home"},
//        {routes:"/addproducts",targetId:"addProduct"},
//      ]
    //  possibleRoutes.forEach(({route,targetId})=>{
      ///  window.jQuery('#${targetId}').removeClass('active')
    //    if(route == pathname){
    //      window.jQuery('#${targetId}').addClass('active')
    //    }
  //    })
  //  }
  logUserOut = (e)=>{
    e.preventDefault()
    this.props.logout()
  }
    render(){
      const Child = this.state.child
      const {user} = this.props.auth
      return (
          <div>
            Navbar Name:{user.name}
            <Child {...this.props} search = {this.state.search}/>
            <Link to ="/dashboard" ><div>MerchantStore</div></Link>
            <Link to ="/dashboard/addProduct"><div>create Link Product</div></Link>
            <Link to ="/dashboard/products"><div>Products</div></Link>
            <Link to ="" onClick = {this.logUserOut}>LOGOUT</Link>
            <Link to="/dashboard/profile"><div>Profile</div></Link>
            <Link to="/dashboard/addprofile"><div>Add Profile</div></Link>
            footer
          </div>

      )
    }
}

Dashboard.propTypes = {
  auth:PropTypes.object.isRequired,
  logout:PropTypes.func.isRequired,
}
const mapStateToProps =(state)=>({
  auth:state.auth
})

export default connect(mapStateToProps,{logout})(Dashboard)
