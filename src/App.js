import React, { Component } from 'react'
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css';


 class App extends Component {
  constructor(props){
    super(props);
    this.state={
      displayName:'',
           
    }
  }

  changeHandler=(e)=>{
    this.setState({
      displayName:e.target.value

   })
  }

  submitData=async (e)=>{
    e.preventDefault()
    let name= await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.b25689e45ce9b253dc8d624cf71fa8e1&city=${this.state.displayName}&format=json`)
    // let map= await axios.get(`https://maps.locationiq.com/v3/staticmap?key=pk.b25689e45ce9b253dc8d624cf71fa8e1&center=${this.state.longitude},${this.state.latitude}&zoom=1-18`)
    this.setState({
      displayName:name.data[0].display_name,
      longitude:name.data[0].lon,
      latitude:name.data[0].lat
    })
    console.log(name.data[0])
    // console.log(map.data[0])
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.submitData} style={{marginLeft: '20px',paddingTop:'20px' } }>
          <input type='text' placeholder='city name....' onChange={(e)=>{this.changeHandler(e)}} />
          <button>Explore</button>
        </form>
        <h1>{this.state.displayName}</h1>
        <h1>{this.state.longitude}</h1>
        <h1>{this.state.latitude}</h1>
        <Image alt="map" src= {`https://maps.locationiq.com/v3/staticmap?key=pk.b25689e45ce9b253dc8d624cf71fa8e1&center=${this.state.latitude},${this.state.longitude}&zoom=1-18`}
         fluid style={{margin: '100px' } }   />
        
        {/* <Image src="holder.js/100px250" fluid /> */}
      </div>
    )
  }
}

export default App
