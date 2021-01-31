import React, { Component } from 'react';
import '../../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        questions: [],
        answers: [],
        correct: false
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
    if (answer===this.state.questions[0].correct_answer) {
      console.log("correct") 
      this.setState({
        correct:true
      })
    } else {
      console.log("wrong");
      this.setState({
        correct:false
      })
  }
  }

  render() {
    return (
    <div className="App">
      <header className="App-header">
        
        <p>
          Brainium
        </p>
        
        <span style={{color:"blue"}}>Wrinkle Your Brain</span><p/>
        {this.state.questions && this.state.questions.map( question => 
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
          {this.state.correct && 
          <div>
            You got it!
          </div>
          }
      </header>
    </div>
  );
}
}

export default App;
