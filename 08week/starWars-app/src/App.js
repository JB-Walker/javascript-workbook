import React, { Component } from 'react';
import './App.css';
import CharacterCard from './CharacterCard.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        characters: [],
    }
  }

  componentDidMount(){
       fetch('https://swapi.co/api/people/')
          .then((response) => response.json())
          .then((responseJson) => {
            return this.setState({characters: responseJson.results})
          })
          .catch((error) => {
            console.error(error);
          });
    }

    renderCharacters() {
      console.log('in renderCharacters');

      console.log('characters array', this.state.characters);
      }

  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Star Wars</h2>
          </div>
        </div>

        <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          {this.renderCharacters()}
        </div>
      </div>
    );
  }
}


export default App;
