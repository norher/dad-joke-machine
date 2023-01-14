import React, { Component } from 'react';
import './Machine.css';
import Joke from './Joke.js';

class Machine extends Component {
    render() {
        return (
            <div>
                <Joke />
            </div>
        )
    }
}

export default Machine;