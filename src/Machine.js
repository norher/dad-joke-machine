import React, { Component } from 'react';
import './Machine.css';
import Joke from './Joke.js';
import axios from 'axios';

class Machine extends Component {
    constructor(props) {
        super(props);
        this.state = { jokes: []}
    }
    static defaultProps = {
        numJokes : 10
    };
    async componentDidMount() {
        let jokes = [];
        while(jokes.length < this.props.numJokes){
            let res = await axios.get("https://icanhazdadjoke.com/", {
                headers: { Accept: "application/json"}
            });
            jokes.push(res.data.joke)
        }
        this.setState({jokes: jokes});
    }


    render() {
        return (
            <div className='Machine'>
                <div className='Machine-sidebar'>
                    <h1 className='Machine-Title'>
                        <span>Dad</span> Jokes
                    </h1>
                    <img 
                        src='https://www.maxpixel.net/static/photo/640/Comic-Funny-Emotion-Yellow-Smiley-Emoticon-Emoji-4832492.png' 
                        alt='laughing crying face'
                        height={325}
                        width={325} 
                    />
                    <button>Get Jokes!</button>
                </div>
                <div className='Machine-Jokes'>
                    {this.state.jokes.map(j => (
                        <div>{j}</div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Machine;