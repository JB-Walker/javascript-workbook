import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class CharacterCard extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="card">
                <h2>{this.props.name}</h2>
                <p>{this.props.birth_year}</p>
            </div>
        );
    }
}

export default CharacterCard;
