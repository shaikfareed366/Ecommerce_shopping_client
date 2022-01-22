import React from 'react'
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {logout} from '../../actions/authActions'
const Navbar = ({auth:{isAuthenticated},logout})=>{
  const user = (
    <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/Register?role=merchants">Become A Merchants</Link>
          </li>
          <li>
            <Link to="/cart">cart</Link>
          </li>
          <li>
            <Link to="/Login" onClick = {logout}>Logout</Link>
          </li>

    </ul>
  )
  const guest = (
    <ul>
          <li>
            <Link to="/Register?role=merchants">Merchants</Link>
          </li>
          <li>
            <Link to="/Register?role=customer">Register</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>

    </ul>
  )
  return (
    <>
    <nav className="a">
        <h1>
              <Link to="#">
                e-shop
              </Link>
        </h1>
        {isAuthenticated?user:guest}
    </nav>

    </>
  );
}
const mapStateToProps = state =>({
  auth:state.auth
})


export default connect(mapStateToProps,{logout})(Navbar)
