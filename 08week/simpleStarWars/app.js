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
          <tr>
            <td data-characterIndex='{index}' className='name'>{character.name}</td>
            <td data-characterIndex='{index}' className='spacer'>.</td>
            <td data-characterIndex='{index}' className='gender'>{character.gender}</td>
            <td data-characterIndex='{index}' className='eyes'>{character.hair_color}</td>
            <td data-characterIndex='{index}' className='hair'>{character.eye_color}</td>
            <td data-characterIndex='{index}' className='year'>{character.birth_year}</td>
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
