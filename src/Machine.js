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
                <h1>Dad Jokes</h1>
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