import React,{Component} from 'react'
import {withRouter,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createProfile} from '../../../actions/profileActions'
import {message} from 'antd'
class AddProfile extends Component {
  constructor() {
    super()
    this.state = {
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
  onChange = (e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
  onSubmit = (e)=>{
    e.preventDefault()
    if(this.state.address.length<=0) return message.error("address field is required");
    if(this.state.bio.length<=0) return message.error("bio field is required");


    this.props.createProfile(this.state,this.props.history);
  }
  render(){
    const {address,bio,website,facebook,linkedin,youtube,instagram,twitter} = this.state
    return (
      <div>
        Add Profile <hr/>
        <input type="text" placeholder="address" name="address" value={address} onChange={this.onChange}/><hr/>
        <input type="text" placeholder="bio" name="bio" value={bio} onChange={this.onChange}/><hr/>
        <input type="text" placeholder="website" name="website" value={website} onChange={this.onChange}/><hr/>
        <input type="text" placeholder="facebook" name="facebook" value={facebook} onChange={this.onChange}/><hr/>
        <input type="text" placeholder="linkedin" name="linkedin" value={linkedin} onChange={this.onChange}/><hr/>
        <input type="text" placeholder="youtube" name="youtube" value={youtube} onChange={this.onChange}/><hr/>
        <input type="text" placeholder="instagram" name="instagram" value={instagram} onChange={this.onChange}/><hr/>
        <button onClick = {this.onSubmit}>submit</button>
        <Link to="/dashboard/profile">Go Back</Link>
      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  profile:state.profile,
})
export default connect(mapStateToProps,{createProfile})(withRouter(AddProfile))
