import React, { Component } from 'react'
import axios from 'axios';
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
    this.setState({
      displayName:name.data[0].display_name,
      longitude:name.data[0].lon,
      latitude:name.data[0].lat
    })
    console.log(name.data[0])
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.submitData}>
          <input type='text' placeholder='city name....' onChange={(e)=>{this.changeHandler(e)}} />
          <button>Explore</button>
        </form>
        <h1>{this.state.displayName}</h1>
        <h1>{this.state.longitude}</h1>
        <h1>{this.state.latitude}</h1>
      </div>
    )
  }
}

export default App
