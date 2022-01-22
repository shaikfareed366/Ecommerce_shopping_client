import React,{Component} from 'react'
import {getProduct} from '../../actions/productAction'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Spin,Space,Rate,Modal,Button,Alert} from 'antd'
import {Link} from 'react-router-dom'
import {decodeUser} from '../../util'
import {addToCart} from '../../actions/cartActions'
class ProductDetails extends Component{
  constructor(props){
   super(props)
   this.state={
     product:{},
   }
 }
 componentDidMount(){
   const id = this.props.match.params.id;
   this.props.getProduct(id)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.product){
      const product = nextProps.product
      this.setState({product:product})
    }
  }
isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}
  showModal = () => {
      this.setState({visible:true})

    };

    handleOk = () => {
        this.setState({visible:false})
    };

    handleCancel = () => {
      this.setState({visible:false})
    };

  registerModel =(product)=>{
      return (
          <Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}
          footer = {[
             <Button key="back" onClick={this.handleCancel}>
               close
             </Button>,
           ]}
          >
              <Alert
                message = {
                  <center>
                    <span>
                      <strong>
                        Added
                      </strong>
                        {product.name} to cart
                    </span>
                  </center>
                }
                />
            <center>
              <Link to="/cart?redirect=/cart">
                <Button key="submit" type="primary">
                  Go to cart
                </Button>
              </Link>
            </center>
          </Modal>
      );
  }
  async addProductToCart(product){
    //check id user is sign in
    //if not use localStorage
    if(!localStorage.getItem("token")){
      const productExists = localStorage.getItem("products")
      console.log(productExists);
        if(productExists){
          const products = JSON.parse(localStorage.getItem("products"))
          products.push(product._id)
          console.log(products);
          this.showModal()
          return localStorage.setItem("products",JSON.stringify(products));
        }else{
          this.showModal()
          return localStorage.setItem("products",JSON.stringify([product._id]));
        }
    }
    const userId = decodeUser().user.id
    const context = {products:[product._id],userId}
    console.log(context)
      this.showModal()
    const res = await this.props.addToCart(context)

  }
render(){
  const {product} = this.state
  return (
    <div>
      {
        product ?
        (<div>
        product detils
        <h1>productname:{product.name}</h1>
        <h1>product description:{product.description}</h1>
        <h1>product Quantity:{product.quantity}</h1>
        <h1>product amount:{product.amount}</h1>
        <Rate disabled allowHalf defaultValue = {2.5}/>
        <button onClick = {(_)=>this.addProductToCart(product)}>Add to cart</button>
        </div>) :
        (<div>
        <Space size="middle"><Spin size="large"/></Space>
        </div>)
      }
      {product && this.registerModel(product)}
    </div>
  );
}
}
const mapStateToProps = (state) =>({
  product:state.products.product
})


export default connect(mapStateToProps,{getProduct,addToCart})(withRouter(ProductDetails))
