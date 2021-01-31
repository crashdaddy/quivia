import React, { Component } from 'react';
import '../../App.css';

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
       {this.state.scores && this.state.scores.map(leader => <div>

         {leader.playerName} - {leader.score}
       </div>)

       }
      </header>
    </div>
  );
}
}

export default LeaderBoard;