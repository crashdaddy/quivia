import React, { Component } from 'react';
import '../../App.css';

class HighScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
        success: false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const postData = { playerName: this.state.value, score: this.props.score };
    const registerUrl = "https://quiviaapi.herokuapp.com/addScore";
    fetch(registerUrl, {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "200") {
         this.setState({
             success: true
         })
        } else {

          console.log("error code", data);
        } 

      })
      .catch((error) => {
        console.log('Error: ', error);
 
      })
  }

  render() {
    return (
   <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Add Your Name to Our BrainBoard!:
          <input style={{marginLeft:'5px',fontSize:'large'}} type="text" value={this.state.value} onChange={this.handleChange} required />
        </label>
        <input type="submit" value="Submit" />
      </form><p/>
      {this.state.success && <div>
          Your score has been saved!
          </div>}
   </div>
  );
}
}

export default HighScore;
