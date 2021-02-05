import React, { Component } from 'react';
import '../../App.css';
import logo from '../app/brainium-logo2.png'
import loader from './loader.gif'

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      loading: true
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
        scores: data,
        loading: false
      })
       
    })
  }

  
  render() {
    return (
    <div className="App">
      <header className="App-header">
        <div style={{fontSize:"xx-large",color:"lightgreen",margin:"20px"}}>
          <img src={logo} style={{width:"200px"}} alt=""/><br/>
          Big Beautiful Bulging Brilliant Brainium Brains</div>
       {this.state.scores && this.state.scores.map(leader => <div>

         {leader.playerName} - {leader.score}
       </div>)
       }
      {this.state.loading &&
      <div>
        <img src={loader} alt="" style={{width:'100px'}}/> Loading High Scores
      </div>
  }
       <div style={{marginTop:"20px"}}>
         <a href="/" style={{color:"white"}}>Back to Brainium!</a>
       </div>
      </header>
    </div>
  );
}
}

export default LeaderBoard;