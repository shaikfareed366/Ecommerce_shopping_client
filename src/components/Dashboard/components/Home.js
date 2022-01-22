import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
const Home = ({auth})=>{
    const {name} = auth.user
  return (
    <div>
    body Home {name}
    </div>
  )
}

Home.propTypes = {
  auth:PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
  auth:state.auth
})
export default connect(mapStateToProps)(Home)
