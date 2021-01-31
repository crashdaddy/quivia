import React, { Component } from 'react';
import '../../App.css';
import logo from '../app/brainium-logo2.png'
import Jason from './jason.jpg'
import Me from './me.png'

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
    };
  }

  
  componentDidMount() {
    this.getScores()
  }


  getScores = () => {
 
    let url = "http://quiviaapi.herokuapp.com/users";
    fetch(url)
    .then(res=>res.json())
    .then(data => {
      this.setState({
        scores: data
      })
       
    })
  }

  
  render() {
    return (
    <div className="App">
      <header className="App-header">
        <div style={{fontSize:"xx-large",color:"lightgreen",margin:"20px"}}>
          <img src={logo} style={{width:"200px"}} alt=""/><br/>
          Contributors</div>
        <div style={{width:"50%",marginTop:"20px",display:'flex',flexDirection:"row",justifyContent:"center",alignContent:"space-around"}}>
           <div>
           <a href="https://github.com/crashdaddy"> <img src = {Me} style={{width:"150px"}} alt="" /></a><br/>
           Crashdaddy
           </div> 
           <div style={{marginLeft:"100px"}}>
           <a href="https://github.com/JasonMcGee0715"><img src = {Jason} style={{width:"150px"}} alt="" /></a><br/>
           JasonMcGee0715
           </div>
        </div>
         <div style={{marginTop:"20px"}}>
         <a href="/" style={{color:"white"}}>Back to Branium!</a>
       </div>
      </header>
    </div>
  );
}
}

export default LeaderBoard;