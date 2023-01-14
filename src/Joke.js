import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
    render() {
        return (
            <div>
                <button>Upvote</button>
                <text>Counter</text>
                <button>Downvote</button>
                <text>Joke here rendered by React</text>
            </div>
        )
    }
}

export default Joke;