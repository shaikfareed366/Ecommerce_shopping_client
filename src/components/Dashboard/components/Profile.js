import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {getProfile,deleteAccount} from '../../../actions/profileActions'
import {decodeUser} from '../../../util'
import { Modal, Button } from 'antd';
import {message, Popconfirm} from 'antd'
import {createProfile} from '../../../actions/profileActions'
class Profile extends Component{
  constructor(props) {
    super(props)
    this.state = {
        profile:null,
        visible:false,
          address:"",
          bio:"",
          website:"",
          facebook:"",
          linkedin:"",
          youtube:"",
          instagram:"",
          twitter:"",
        }
  }
  componentDidMount(){
    this.props.getProfile(decodeUser().user.id);
  }
  componentWillReceiveProps(nextProps){
      if(nextProps && nextProps.profile && nextProps.profile.profile){
        const profile = nextProps.profile.profile
        this.setState({profile:profile,address:profile.address,
        bio:profile.address,
        website:profile.website,
        facebook:profile.socialMedia.facebook,
        linkedin:profile.socialMedia.linkedin,
        youtube:profile.socialMedia.youtube,
        instagram:profile.socialMedia.instagram,
        twitter:profile.socialMedia.twitter,})
      }
  }
  onChange = (e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
  onSubmit = (e)=>{
    e.preventDefault()
    if(this.state.address.length<=0) return message.error("address field is required");
    if(this.state.bio.length<=0) return message.error("bio field is required");
    this.props.createProfile(this.state,this.props.history);
    window.location.reload()
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

  displayProfile = (profile)=>{
    return (
      <div>
          <h4>address:{profile.address}</h4>
            <h4>bio:{profile.bio}</h4>
            <h4>facebook:{profile.socialMedia.facebook}</h4>
            <button onClick = {this.showModal}>Edit</button>
            <Popconfirm
       title="Are you sure to delete this profile?"
       onConfirm={this.confirm}
       onCancel={this.cancel}
       okText="Yes"
       cancelText="No"
     >
       <button onClick = {this.confirm}>Delete Profile</button>
     </Popconfirm>
      </div>
    )
  }
  confirm=(e)=> {
  e.preventDefault()
  this.props.deleteAccount(this.props.history)

}

cancel=(e)=> {
  console.log(e);
  message.error('nothing has been done');
}


  render(){
    const {name} = this.props.auth.user
    return (
      <div>
        <h2>welcome {name}</h2>
        {
          this.state.profile?
          ( <div>
            <h5>This is your profile</h5>
            {this.displayProfile(this.state.profile)}
            </div>
          ):
          <div>
            <h2>sorry you dont have a profile</h2>
          <Link to="/dashboard/addprofile"><span>create a profile</span></Link>
          </div>

        }
        <Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}
        footer={[
           <Button key="back" onClick={this.handleCancel}>
             cancel
           </Button>,
           <Button key="submit" type="primary" onClick={this.onSubmit}>
             edit profile
           </Button>,

         ]}
        >
           <form>
              <input type="text" name="address" value={this.state.address} onChange = {this.onChange} />
                <input type="text" name="website" value={this.state.website} onChange = {this.onChange} />
                  <input type="text" name="facebook" value={this.state.facebook} onChange = {this.onChange} />
                    <input type="text" name="linkedin" value={this.state.linkedin} onChange = {this.onChange} />
                    <input type="text" name="instagram" value={this.state.instagram} onChange = {this.onChange} />
                    <input type="text" name="youtube" value={this.state.youtube} onChange = {this.onChange} />
                  <input type="text" name="twitter" value={this.state.twitter} onChange = {this.onChange} />
           </form>
         </Modal>
      </div>

    )
  }
}

const mapStateToProps = (state)=>({
  auth:state.auth,
  profile:state.profile,
})
export default connect(mapStateToProps,{getProfile,createProfile,deleteAccount})(withRouter(Profile))
