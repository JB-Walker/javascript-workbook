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
          <tr key={`Row-${index}`}>
            <td key={`Name-${index}`} data-characterName={character.name} className='name'>{character.name}</td>
            <td key={`Spacer-${index}`} data-characterName={character.name} className='spacer'>.</td>
            <td key={`Gender-${index}`} data-characterName={character.name} className='gender'>{character.gender}</td>
            <td key={`Eyes-${index}`} data-characterName={character.name} className='eyes'>{character.hair_color}</td>
            <td key={`Hair-${index}`} data-characterName={character.name} className='hair'>{character.eye_color}</td>
            <td key={`year-${index}`} data-characterName={character.name} className='year'>{character.birth_year}</td>
          </tr>
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


ReactDOM.render(<StarWars />, document.getElementById('game'));
