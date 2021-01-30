import React, { Component } from 'react';
import '../../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        questions: []
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = () => {
 
    let url = "https://opentdb.com/api.php?amount=1&type=multiple";
    fetch(url)
    .then(res=>res.json())
    .then(data => {
      
      this.setState({
        questions: data.results
      })
    })
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
          <div>
            <div dangerouslySetInnerHTML={{ __html: question.question }}></div><p/>
            {question.incorrect_answers.map(wrong => 
              <div>
                {wrong}
              </div>
              )}
          </div>
          )}
      </header>
    </div>
  );
}
}

export default App;
