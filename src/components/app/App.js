import React, { Component } from 'react';
import '../../App.css';
import logo from './brainiumLogo.png'
import brain from './brain.png'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        questions: [],
        answers: [],
        correct: false,
        wrong: false,
        wrongAnswers: [],
        gameOver: false,
        score: 0
    };
  }

  
// generate a random number in the required range (min-max)
getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

  componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate() {
    if(this.state.correct || this.state.wrong) {
      this.setState({
        correct:false,
        wrong: false
      })
      this.getQuestions()
    }
  }

  getQuestions = () => {
 
    let url = "https://opentdb.com/api.php?amount=1&type=multiple";
    fetch(url)
    .then(res=>res.json())
    .then(data => {
     let rightPosition = this.getRandomInt(0,2)
     let answerArray = data.results[0].incorrect_answers
     answerArray.splice(rightPosition,0,data.results[0].correct_answer)
      console.log(answerArray)
      this.setState({
        questions: data.results,
        answers: answerArray
      })
   
    
    })
  }

  checkAnswer(answer) {
    let gameOver=this.state.gameOver;
    if (!gameOver) {
    let currentScore = this.state.score;
    if (answer===this.state.questions[0].correct_answer) {
      if(this.state.questions[0].difficulty==="easy") {
        currentScore+=5;
      } else if (this.state.questions[0].difficulty==="medium") {
        currentScore+=10;
      } else if (this.state.questions[0].difficulty==="hard") {
        currentScore+=20;
      }
      this.setState({
        score:currentScore,
        correct:true,
        wrong: false
      })
    } else {
      let gameOver=false;
      let totalWrong = this.state.wrongAnswers;
      if(totalWrong.length<3) {
        totalWrong.push("wrong");
      }
      
      if (totalWrong.length===3) {gameOver=true}
      currentScore-=5;
      if (currentScore<0) currentScore=0;
      this.setState({
        score:currentScore,
        correct:false,
        wrongAnswers:totalWrong,
        gameOver:gameOver,
        wrong: true
      })
  }
}
}

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} style={{width:"200px"}} />
        <span>
          Brainium - <span style={{color:"blue"}}>Wrinkle Your Brain</span>
        </span>
        
        <p/>
        {this.state.questions && !this.state.gameOver && this.state.questions.map( question => 
          <div style={{width:"100%"}}>
            <div dangerouslySetInnerHTML={{ __html: question.question }}></div><p/>
            <div style={{textAlign:"center",display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center",alignContent:"center"}}>
            {this.state.answers.map(answer => 
              <div style={{padding:"20px",width:"20%",margin:"20px",backgroundColor:"blue"}} onClick={()=>this.checkAnswer(answer)} dangerouslySetInnerHTML={{ __html: answer }}>
              </div>
              )}
            </div>
          </div>
          )}
          {this.state.score && 
          <div>
            {this.state.score}
          </div>
          }
          {this.state.wrong && 
          <div>
            incorrect
          </div>
          }
          <div style={{textAlign:"center",display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center",alignContent:"center"}}>
          {this.state.wrongAnswers && this.state.wrongAnswers.map(newWrong => 
          <div>
          <img src={brain} style={{width:"100px",margin:"10px",backgroundColor:"red"}} />
           </div>
          )}
          </div>

          {this.state.gameOver && 
          <div>
            Game Over
          </div>
          }
      </header>
    </div>
  );
}
}

export default App;
