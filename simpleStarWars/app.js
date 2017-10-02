'use strict';

class StarWars extends React.Component {
  constructor (props) {
    super(props);
    this.resetState = {
      characters: []
    };
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

  renderCharacterDataHeadings () {
    return (
      <tr>
        <th key={`Name`} className='name'>Name</th>
        <th key={`Spacer`} className='spacer'>.</th>
        <th key={`Gender`} className='gender'>Gender</th>
        <th key={`Eyes`} className='eyes'>Hair</th>
        <th key={`Hair`} className='hair'>Eyes</th>
        <th key={`Year`} className='year'>Birth</th>
      </tr>
    );
  }

  renderCharacterData () {
    return (
      this.state.characters.map((character, index) => {
        return (
        <tr key={`Row-${index}`}>
          <td onClick={(e) => this.handleChange(e)} key={`Name-${index}`} data-characterName={character.name} className='name'>{character.name}</td>
          <td key={`Spacer-${index}`} data-characterName={character.name} className='spacer'>.</td>
          <td key={`Gender-${index}`} data-characterName={character.name} className='gender'>{character.gender}</td>
          <td key={`Eyes-${index}`} data-characterName={character.name} className='eyes'>{character.hair_color}</td>
          <td key={`Hair-${index}`} data-characterName={character.name} className='hair'>{character.eye_color}</td>
          <td key={`year-${index}`} data-characterName={character.name} className='year'>{character.birth_year}</td>
        </tr>
        );
      })
    );
  }

  render () {
    if (!this.state.characters.length) {
      return (
        <h2 id='title'>error loading data from api</h2>
      );
    }
    return (
      <div className='app'>
        <h2 id='title'>Star Wars Trivia Matchup</h2>
        <table>
          <tbody>
            {this.renderCharacterDataHeadings()}
            {this.renderCharacterData()}
          </tbody>
        </table>
      </div>
    );
  }
}

ReactDOM.render(<StarWars />, document.getElementById('game'));
