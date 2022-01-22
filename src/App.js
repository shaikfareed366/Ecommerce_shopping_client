import React,{useEffect} from "react"
import {Provider} from "react-redux"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import store from './store'
import Landing from "./components/landing"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import ProtectedRoute from './components/general/ProtectedRoute'
import Dashboard from './components/Dashboard'
import Home from './components/Dashboard/components/Home'
import AddProduct from './components/Dashboard/components/AddProduct'
import Products from './components/Dashboard/components/Products'
import AddProfile from './components/Dashboard/components/AddProfile'
import Profile from './components/Dashboard/components/Profile'
import ProductDetails from './components/landing/ProductDetails'
import Cart from './components/customers/Cart'
import {addToCart} from './actions/cartActions'
import {decodeUser} from './util'
import './App.css'
import 'antd/dist/antd.css'
import setAuthToken from "./util/setAuthToken"
import {setCurrentUser} from './actions/authActions'
if(localStorage.token){
  setAuthToken(localStorage.token)
}
function App(props) {
  useEffect(()=>{
    store.dispatch(setCurrentUser())
  },[])
const grabProductsFromStorage =()=>{
    const userId = decodeUser().user.id
    const cartProducts = JSON.parse(localStorage.getItem("products"))
    const context = {products:cartProducts,userId}
    store.dispatch(addToCart(context))
    localStorage.removeItem("products")
  }
if(localStorage.getItem("token") && localStorage.getItem("products")){
  grabProductsFromStorage()
}
  return (
      <Provider store = {store}>
            <Router>
              <div className="App">
                  <Route exact path = "/"> <Landing/></Route>
                  <Route exact path = "/products/:id"> <ProductDetails/></Route>
                  <Switch>
                  <ProtectedRoute exact path = "/dashboard" comp={()=><Dashboard {...props} nestedRoute ={Home}/>}>
                  </ProtectedRoute>
                  <ProtectedRoute exact path = "/dashboard/addproduct" comp={()=><Dashboard {...props} nestedRoute ={AddProduct}/>}>
                  </ProtectedRoute>
                  <ProtectedRoute exact path = "/dashboard/products" comp={()=><Dashboard {...props} nestedRoute ={Products}/>}>
                  </ProtectedRoute>
                  <ProtectedRoute exact path = "/dashboard/addprofile" comp={()=><Dashboard {...props} nestedRoute ={AddProfile}/>}>
                  </ProtectedRoute>
                  <ProtectedRoute exact path = "/dashboard/profile" comp={()=><Dashboard {...props} nestedRoute ={Profile}/>}>
                  </ProtectedRoute>
                  <ProtectedRoute exact path = "/cart" comp={Cart}>
                  </ProtectedRoute>
                  <Route exact path = "/Register"> <Register/></Route>
                  <Route exact path = "/Login"> <Login/></Route>
                </Switch>
              </div>
            </Router>
      </Provider>
  );
}

export default App;
