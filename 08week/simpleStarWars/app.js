'use strict';

class StarWars extends React.Component {
  constructor (props) {
    super(props);
    this.resetState = {
      characters: [],
    }
    this.state = {...this.resetState};
  }

  componentDidMount () {
    fetch('https://swapi.co/api/people/')
      .then((response) => response.json())
      .then((responseJson) => {
        return this.setState({characters: responseJson.results});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderCharacterData () {
    if (this.state.characters) {
      return this.state.characters.map((character, index) => {
        return (
          <CharacterLine key={index}
            name={character.name}
            gender={character.gender}
            eyes={character.eye_color}
            hair={character.hair_color}
            year={character.birth_year}
          />
        );
      });
    }
  }

  render () {
    return (
      <div className='app'>
        <h2 id='title'>Star Wars Trivia Matchup</h2>
        <table>
          <tbody>
            {this.renderCharacterData()}
          </tbody>
        </table>

      </div>
    );
  }
}

class CharacterLine extends React.Component {
  render () {
    return (
      <tr>
        <td data-characterIndex='{index}' className='name'>{this.props.name}</td>
        <td data-characterIndex='{index}' className='spacer'>.</td>
        <td data-characterIndex='{index}' className='gender'>{this.props.gender}</td>
        <td data-characterIndex='{index}' className='eyes'>{this.props.hair}</td>
        <td data-characterIndex='{index}' className='hair'>{this.props.eyes}</td>
        <td data-characterIndex='{index}' className='year'>{this.props.year}</td>
      </tr>
    );
  }
}

ReactDOM.render(<StarWars />, document.getElementById('game'));
